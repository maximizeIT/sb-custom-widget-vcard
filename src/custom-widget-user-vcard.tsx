import React, { FunctionComponent, ReactElement } from "react";
import { UserInformation } from "./UserInformation";
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
    {user && <UserInformation user={user} />}
  </div>;
};

