import React, { FunctionComponent, ReactElement } from "react";
import { WidgetApi, SBUserProfile } from "widget-sdk";

import { Loading } from './Loading';

/**
 * React Component
 */
export interface CustomWidgetUserVcardProps {
  userId: string;
  widgetApi: WidgetApi;
}

export const CustomWidgetUserVcard: FunctionComponent<CustomWidgetUserVcardProps> = ({ userId, widgetApi }: CustomWidgetUserVcardProps): ReactElement => {

  const [user, setUser] = React.useState<SBUserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    widgetApi.getUserInformation(userId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <div>
    {loading && <Loading />}
    {user && <div>{user.firstName} {user.lastName}<br /><br />{user.department}: {user.position}<br/>{user.location}<br/><br/>Contact:<br/>{user.publicEmailAddress}<br/>{user.phoneNumber}</div>}
  </div>;
};

