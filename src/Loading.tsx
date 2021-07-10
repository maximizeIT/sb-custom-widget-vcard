import React, { FunctionComponent, ReactElement } from "react";

export interface LoadingProps {
  error: boolean;
}

export const Loading: FunctionComponent<LoadingProps> = ({ error }: LoadingProps): ReactElement => {
  return <div>{error ? <strong>Error loading the user. Please check the entered user ID.</strong> : <strong>Loading…</strong>}</div>;
};