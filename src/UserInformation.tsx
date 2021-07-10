import React, { FunctionComponent, ReactElement } from "react";
import { SBUserProfile, ColorTheme } from '@staffbase/widget-sdk';

export interface UserInformationProps {
  user: SBUserProfile;
  theme: ColorTheme;
}

function createVcardQrCode(user: SBUserProfile, theme: ColorTheme) {

  const size = "&size=220x220&margin=5";

  const themeColor = theme.textColor ? `&color=${theme.textColor}` : "";
  const bgColor = theme.bgColor ? `&bgcolor=${theme.bgColor}` : "";
  const firstName = encodeURIComponent(user.firstName);
  const lastName = encodeURIComponent(user.lastName);
  let publicEmailAddress = user.publicEmailAddress;
  let phoneNumber = user.phoneNumber;

  phoneNumber ? phoneNumber = "%0ATEL%3BWORK%3BVOICE%3A" + encodeURIComponent(phoneNumber) : phoneNumber = "";
  publicEmailAddress ? publicEmailAddress = "%0AEMAIL%3BWORK%3BINTERNET%3A" + encodeURIComponent(publicEmailAddress?.toLocaleLowerCase()) : publicEmailAddress = "";

  const url = "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A"
    + lastName
    + "%3B"
    + firstName
    + "%0AFN%3A"
    + firstName
    + "+"
    + lastName
    + "%0AORG%3A%0ATITLE%3A%0AADR%3A%3B%3B%3B%3B%3B%3B"
    + phoneNumber
    + "%0ATEL%3BCELL%3A%0ATEL%3BFAX%3A"
    + publicEmailAddress
    + "%0AURL%3A%0AEND%3AVCARD%0A"
    + size
    + themeColor
    + bgColor;

  return url;
}

export const UserInformation: FunctionComponent<UserInformationProps> = ({ user, theme }: UserInformationProps): ReactElement => {

  const qrCodeUrl = createVcardQrCode(user, theme);

  return (
    <div>
      <h2>User Information</h2>
      <h3>{user.firstName} {user.lastName}</h3>
      <p><strong>Department:</strong> {user.department ? user.department : 'n/a'}<br/>
      <strong>Position:</strong> {user.position ? user.position : 'n/a'}<br/>
      <strong>Location:</strong> {user.location ? user.location : 'n/a'}<br/>
      <strong>Contact:</strong><br />E-Mail: {user.publicEmailAddress ? user.publicEmailAddress : 'n/a'}<br />Phone: {user.phoneNumber ? user.phoneNumber : 'n/a'}
      <br/><br/>
      <strong>Scan QR Code for VCard:</strong>
      <br/><br/>
      {qrCodeUrl && <img src={qrCodeUrl}></img>}
      <br/><br/>
      <i>User information retrieved by widget API provided by Custom Widget SDK.</i></p>
    </div>
  );
};