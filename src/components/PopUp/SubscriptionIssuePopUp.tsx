import React, { FC } from 'react';
import PopUp from './PopUp';
import { SubscriptionIssue } from '@/types';

interface IPopUp {
    handlePopUp: () => void;
    issue: SubscriptionIssue;
}

const SubscriptionIssuePopUp: FC<IPopUp> = ({ handlePopUp, issue }) => {
    const title =
        issue === SubscriptionIssue.PAYMENT_FAILED
            ? 'Subscription payment failed or missing'
            : 'All subscription credits where used';
    const image =
        issue === SubscriptionIssue.PAYMENT_FAILED
            ? '/images/subscription-failed.png'
            : '/images/subscription-credits-used.png';
    const mainActionTitle =
        issue === SubscriptionIssue.PAYMENT_FAILED ? 'Upgrade' : 'Subscription';
    const imageAlt =
        issue === SubscriptionIssue.PAYMENT_FAILED
            ? 'Subscription failed'
            : 'All credits used';
    const content =
        issue === SubscriptionIssue.PAYMENT_FAILED
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
