import React, { FC } from 'react';
import PopUp from './PopUp';
import { SubscriptionPopupVariantType } from '@/types';
import { PopupVariant } from '@/types';

interface IPopUp {
    handlePopUp: () => void;
    issue: SubscriptionPopupVariantType;
}

const SubscriptionIssuePopUp: FC<IPopUp> = ({ handlePopUp, issue }) => {
    const title =
        issue === PopupVariant.PAYMENT_FAILED
            ? 'Subscription payment failed or missing'
            : 'All subscription credits where used';
    const image =
        issue === PopupVariant.PAYMENT_FAILED
            ? '/images/subscription-failed.png'
            : '/images/subscription-credits-used.png';
    const mainActionTitle =
        issue === PopupVariant.PAYMENT_FAILED ? 'Upgrade' : 'Subscription';
    const imageAlt =
        issue === PopupVariant.PAYMENT_FAILED
            ? 'Subscription failed'
            : 'All credits used';
    const content =
        issue === PopupVariant.PAYMENT_FAILED
            ? 'Please proceed by following the link if your subscription payment has not been received or was unsuccessful.'
            : 'The subscriptions you have been enrolled in have come to an end. To upgrade your subscription plan follow the link.';

    return (
        <PopUp
            handlePopUp={handlePopUp}
            mainActionTitle={mainActionTitle}
            title={title}
            image={image}
            imageAlt={imageAlt}
            content={content}
            buttonColor="secondary"
        />
    );
};

export default SubscriptionIssuePopUp;
