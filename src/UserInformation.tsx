import React, { FunctionComponent, ReactElement } from "react";
import { SBUserProfile } from '@staffbase/widget-sdk';

export interface CustomWidgetUserVcardProps {
  user: SBUserProfile
}

export const UserInformation: FunctionComponent<CustomWidgetUserVcardProps> = ({ user }: CustomWidgetUserVcardProps): ReactElement => {
    return (<div>
      <h1>User Information</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <p><strong>Department:</strong> {user.department ? user.department : 'n/a'}<br/>
      <strong>Position:</strong> {user.position ? user.position : 'n/a'}<br/>
      <strong>Location:</strong> {user.location ? user.location : 'n/a'}<br/>
      <strong>Contact:</strong><br />E-Mail: {user.publicEmailAddress ? user.publicEmailAddress : 'n/a'}<br />Phone: {user.phoneNumber ? user.phoneNumber : 'n/a'}<br/>
      <i>User information retrieved by widget API provided by Custom Widget SDK.</i></p>
    </div>
  );
};