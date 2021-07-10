import React, { FunctionComponent, ReactElement } from "react";
import { UserInformation } from "./UserInformation";
import { WidgetApi, SBUserProfile, ColorTheme } from "widget-sdk";

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
  const [theme, setTheme] = React.useState<ColorTheme | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTheme(widgetApi.getLegacyAppTheme());

    widgetApi.getUserInformation(userId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <div style={{color: theme?.colors.text, backgroundColor: theme?.bgColor, padding: "10px"}}>
    {loading && <Loading />}
    {user && <UserInformation user={user} />}
  </div>;
};

