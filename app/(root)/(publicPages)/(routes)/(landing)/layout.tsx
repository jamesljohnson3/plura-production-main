import * as React from "react";
import Script from 'next/script';

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps): Promise<JSX.Element> {
  
  return (
    <div>
      <Script 
        id="crisp-chat"
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="42292f9b-a92f-409f-acc7-9a0b198d6054";
            (function(){
              var d=document;
              var s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `,
        }}
        type="text/javascript"
      />
      {children}
    </div>
  );
}
