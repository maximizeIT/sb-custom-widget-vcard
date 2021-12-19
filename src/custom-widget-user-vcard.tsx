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
      setLoading(false);
      setError(true);
    });
  }, []);

  return <div>
      <div style={{ color: theme?.colors.text, backgroundColor: theme?.bgColor, padding: "10px" }}>
      {loading && <div style={{color: theme?.colors.blue}}><Loading /></div>}
      {error && <div style={{color: theme?.colors.red}}><Error /></div>}
      {(user && theme && !error) && <UserInformation theme={theme} user={user} />}
    </div>
    <br /><br />
    <div data-widget-conf-grid-type="100" data-widget-type="Section" data-widget-src="internal://staffbase.content.widgets.Section">
      <div>
        <div data-widget-conf-type="warning" data-widget-on-card="true" data-widget-type="Infobox" data-widget-src="internal://staffbase.content.widgets.Infobox">
          <p>PROTOTYPES AND FOR DEMO PURPOSES ONLY!</p>
          <p>NOT FOR PRODUCTION USE!</p>
          <p>NOT AVAILABLE TO CUSTOMERS!</p>
        </div>
      </div>
    </div>
  </div>
};

