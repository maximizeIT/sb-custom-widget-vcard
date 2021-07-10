import React, { FunctionComponent, ReactElement } from "react";
import { WidgetApi, SBUserProfile, ColorTheme } from "widget-sdk";

import { Loading } from './Loading';
import { UserInformation } from "./UserInformation";
export interface CustomWidgetUserVcardProps {
  userid: string;
  widgetApi: WidgetApi;
}

export const CustomWidgetUserVcard: FunctionComponent<CustomWidgetUserVcardProps> = ({ userid, widgetApi }: CustomWidgetUserVcardProps): ReactElement => {

  const [user, setUser] = React.useState<SBUserProfile | null>(null);
  const [theme, setTheme] = React.useState<ColorTheme | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTheme(widgetApi.getLegacyAppTheme());

    widgetApi.getUserInformation(userid ? userid : undefined).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <div style={{color: theme?.colors.text, backgroundColor: theme?.bgColor, padding: "10px"}}>
    {loading && <Loading />}
    {user && <UserInformation user={user} />}
    {userid ? console.log(userid) : console.log("User ID is undefined.")}
  </div>;
};

