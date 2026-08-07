"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";

export default function DiscoveryComingSoon({children,className}:{children:ReactNode;className:string}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return <>
    <button className={className} type="button" onClick={() => dialogRef.current?.showModal()}>{children}</button>
    <dialog className="coming-soon-dialog" ref={dialogRef} aria-labelledby={titleId}>
      <form method="dialog">
        <button className="dialog-close" type="submit" aria-label="Close Coming Soon message" title="Close">×</button>
        <p className="eyebrow">AI Discovery Agent</p>
        <h2 id={titleId}>Coming Soon</h2>
        <p>The AIVLAB AI Discovery Agent is being prepared for launch. Until then, share your AI opportunity directly with our team.</p>
        <a className="arrow" href="mailto:query@aivlab.co.uk?subject=AI Discovery enquiry">Email query@aivlab.co.uk <span>↗</span></a>
      </form>
    </dialog>
  </>;
}
