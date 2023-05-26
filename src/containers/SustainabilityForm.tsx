import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Paper from '@/components/Paper/Paper';
import { Details, IGreenWashingUser } from '@/types';
import { OpenAIApi } from '@/services/OpenAIService';
import Stack from '@/components/Stack/Stack';
import { getMediaCharByMedia } from '@/utils/helpers';
import WindowScrollControls from '@/components/WindowScrollControls/WindowScrollControls';
import StatusDisplay from '@/components/StatusDisplay/StatusDisplay';
import SustainabilityDescription from '@/widgets/SustainabilityDescriptions/SustainabilityDescriptions';
import Sustainability from '@/widgets/Sustainability/Sustainability';
import classes from './SustainabilityForm.module.scss';
import Reset from '@/widgets/Reset/Reset';
import MediaPost from '@/widgets/MediaPost/MediaPost';
import Medias from '@/consts/medias';
import {useAuth} from "@/hooks/useAuth";
import Regions from "@/consts/region";
  interface SustainabilityFormProps {
    setUserInfo: Dispatch<SetStateAction<IGreenWashingUser | null>>
  }

  const SustainabilityForm: React.FC<SustainabilityFormProps> = ({setUserInfo}) => {
    const {user} = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [generatedDescription, setGeneratedDescription] = useState<
        string[] | []
    >([]);
    const detailsRef = useRef<Details | null>(null);
    const [post, setPost] = useState<string>('');
    const handleSubmitDescription = async (details: Details) => {
      const chars = getMediaCharByMedia(details.media as Medias);
      const res = await OpenAIApi.getAssistedBySustainabilityMarketing(
          details,
          chars
      );
      const result: string = res.result?.text || '';
      const userData = res.result?.userData;

      if (userData) {
        setUserInfo(userData);
      }

      setError(null);
      if (res.error) return setError(res.error);

      const termsIndex = result?.indexOf('Terms');
      const postIndex = result?.indexOf('Correct');

      const resDescription = result?.slice(termsIndex + 8, postIndex).split('\n');

      const resPost: string = result?.slice(postIndex + 8);
      if (!user) return;
      console.log(user.id);
       const savePrompt = await OpenAIApi.savePrompt({
         userId: user.id,
         media: details.media as Medias,
         region: details.region as Regions,
         request: details.description,
         response: {
           terms: resDescription,
           correctText: resPost,
         }
       })
      console.log(savePrompt);

      if (resDescription) setGeneratedDescription(resDescription);

      if (resPost) setPost(resPost);

      return res;
    };
    const handleResetClick = () => {
      setGeneratedDescription([]);
      setPost('');
    };

    return (
        <Paper spacing={1.25} direction='column' className={classes.container}>
          <Sustainability
              onSubmitDetails={async (details) => {
                handleResetClick()
                await handleSubmitDescription(details);
              }}
              valuesRef={detailsRef}
          />
          <>
            <div
                id='descriptionsAnchor'
                className={classes.anchor}
            />
            {generatedDescription[0] && (
                <SustainabilityDescription
                    descriptions={generatedDescription}
                />
            )}
            {post && (
                <MediaPost media={detailsRef.current?.media || ''} post={post}/>
            )}
            {post && <Reset onClick={handleResetClick}/>}
          </>
          {error && (
              <Stack
                  className={classes.errorContainer}
                  alignItems='center'
                  justifyContent='center'
              >
                <StatusDisplay
                    message={error}
                    severity='warning'
                    onReset={() => setError(null)}
                />
              </Stack>
          )}
          <WindowScrollControls/>
        </Paper>
    );
  };
export default SustainabilityForm;