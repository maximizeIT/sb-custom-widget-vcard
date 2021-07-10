import React, { FunctionComponent, ReactElement } from "react";
import { WidgetApi, SBUserProfile, ColorTheme } from "widget-sdk";

import { Loading } from './Loading';
import { Error } from './Error';
import { UserInformation } from "./UserInformation";
export interface CustomWidgetUserVcardProps {
  userid?: string;
  widgetApi: WidgetApi;
}

export const CustomWidgetUserVcard: FunctionComponent<CustomWidgetUserVcardProps> = ({ userid, widgetApi }: CustomWidgetUserVcardProps): ReactElement => {

  const [user, setUser] = React.useState<SBUserProfile | null>(null);
  const [theme, setTheme] = React.useState<ColorTheme | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTheme(widgetApi.getLegacyAppTheme());

    widgetApi.getUserInformation(userid).then((user) => {
      setUser(user);
      setLoading(false);
    }).catch(() => {
      setError(true);
    });
  }, []);

  return <div style={{color: theme?.colors.text, backgroundColor: theme?.bgColor, padding: "10px"}}>
    {loading && <Loading />}
    {error && <Error />}
    {(user && !error) && <UserInformation user={user} />}
  </div>;
};

