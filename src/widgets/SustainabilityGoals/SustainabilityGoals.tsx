import { memo, useMemo } from "react";
import { Field, Form } from "react-final-form";
import Chip from "@/components/Chip/Chip";
import Button from "@/components/Button/Button";
import RestartButton from "@/components/RestartButton/RestartButton";
import { Goal } from "@/types";
import classes from "./SustainabilityGoals.module.scss";
import Paper from "@/components/Paper/Paper";

const HEADING_TEXT = "Select sustainability goals that interest you";
const SUBMIT_BUTTON_TEXT = "Select & Generate descriptions";

interface Props {
  goals: Array<string>;
  onSubmitGoals: (goals: Array<string>) => Promise<void>;
  onRegenerate: () => Promise<void>;
  isHiddenButton?: boolean;
  onGenerateDescriptions?: () => Promise<void>;
  isGeneratingDescriptions?: boolean;
}

const SustainabilityGoals = ({
  goals,
  onSubmitGoals,
  onRegenerate,
  isHiddenButton = false,
  onGenerateDescriptions,
  isGeneratingDescriptions,
}: Props) => {
  const initialValues = useMemo(() => {
    return goals.reduce((acc, goal) => {
      acc[goal] = false;
      return acc;
    }, {} as Record<string, boolean>);
  }, [goals]);

  const handleSubmitForm = async (
    values: Record<string, boolean>
    // form: { reset: Function }
  ) => {
    const selectedGoals = goals.filter((goal) => values[goal]);
    await onSubmitGoals(selectedGoals);
    // form.reset();
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, dirty, errors, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Paper
              direction="row"
              wrap="wrap"
              alignItems="center"
              spacing={1}
              hasBorder
              className={classes.fieldsContainer}
            >
              {goals.map((goal) => (
                <Field
                  key={goal}
                  name={goal}
                  type="checkbox"
                  render={({ input }) => (
                    <Chip
                      tabIndex={1}
                      label={goal}
                      isActive={input.checked}
                      onChange={(value: boolean) => {
                        const event = {
                          target: {
                            name: input.name,
                            value,
                          },
                        };
                        input.onChange(event);
                        handleSubmit();
                      }}
                    />
                  )}
                />
              ))}
              <RestartButton
                type="button"
                onRestart={async () => await onRegenerate()}
                tabIndex={1}
              />
            </Paper>
            {!isHiddenButton && (
              <Button
                type="button"
                tabIndex={1}
                className={classes.button}
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
                isSubmitting={isGeneratingDescriptions}
                onClick={onGenerateDescriptions}
              >
                {SUBMIT_BUTTON_TEXT}
              </Button>
            )}
          </form>
        )}
      />
    </div>
  );
};

export default memo(SustainabilityGoals);
