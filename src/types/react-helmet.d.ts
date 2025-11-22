declare module 'react-helmet' {
  import * as React from 'react';

  export interface HelmetProps {
    children?: React.ReactNode;
    [key: string]: any;
  }

  export class Helmet extends React.Component<HelmetProps, any> {}

  export default Helmet;
}
