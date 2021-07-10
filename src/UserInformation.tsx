import React, { FunctionComponent, ReactElement } from "react";
import { SBUserProfile } from '@staffbase/widget-sdk';

export interface CustomWidgetUserVcardProps {
  user: SBUserProfile
}

export const UserInformation: FunctionComponent<CustomWidgetUserVcardProps> = ({ user }: CustomWidgetUserVcardProps): ReactElement => {
    return (<div>
      <h1>User Information by Widget API:</h1>
      <br/><h2>{user.firstName} {user.lastName}</h2>
      <br/><p><strong>Department:</strong> {user.department ? user.department : 'n/a'}</p>
      <br/><p><strong>Position:</strong> {user.position ? user.position : 'n/a'}</p>
      <br/><p><strong>Location:</strong> {user.location ? user.location : 'n/a'}</p>
      <br/><p><strong>Contact:</strong><br/>E-Mail: {user.publicEmailAddress ? user.publicEmailAddress : 'n/a'}<br/>Phone: {user.phoneNumber ? user.phoneNumber : 'n/a'}</p>
    </div>
  );
};