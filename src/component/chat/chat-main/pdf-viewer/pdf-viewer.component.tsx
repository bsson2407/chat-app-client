// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import BaseModal from '../../chat-header/call-modal/base-model.component';
// const PdfViewer = () => {
//   const [numPages, setNumPages] = useState<any>(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }: any) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   function changePage(offSet: any) {
//     setPageNumber((prevPageNumber) => prevPageNumber + offSet);
//   }

//   function changePageBack() {
//     changePage(-1);
//   }

//   function changePageNext() {
//     changePage(+1);
//   }

//   const body = (
//     <div className="App">
//       <header className="App-header">
//         <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//           <Page height={600} pageNumber={pageNumber} />
//         </Document>
//         <p>
//           {' '}
//           Page {pageNumber} of {numPages}
//         </p>
//         {pageNumber > 1 && (
//           <button onClick={changePageBack}>Previous Page</button>
//         )}
//         {pageNumber < numPages && (
//           <button onClick={changePageNext}>Next Page</button>
//         )}
//       </header>
//       <main>
//         <div>
//           <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//           </Document>
//         </div>
//       </main>
//     </div>
//   );

//   return <BaseModal body={body} isShow={true} />;
// };

// export default PdfViewer;

import React, { useEffect, useRef, useState } from 'react';
// import { IconButton } from 'ui-kit';
import shadowRoot from 'react-shadow';

export interface IDocumentViewerProps {
  className?: string;
  step?: number;
  template?: string;
}
interface IPosition {
  x: number;
  y: number;
}
const DocumentViewer: React.FC<IDocumentViewerProps> = ({
  step = 0.1,
  template,
}) => {
  const defaultPosition = {
    left: 0,
    scale: 1,
    top: 0,
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(defaultPosition);

  const handleSetDefault = () => {
    if (containerRef.current && contentRef.current && documentRef.current) {
      setPosition({
        scale: getDefaultScale(),
        top: 0,
        left:
          contentRef.current.clientWidth / containerRef.current?.clientWidth -
          documentRef.current.clientHeight / containerRef.current?.clientHeight,
      });
    }
  };

  useEffect(() => {
    if (contentRef.current && documentRef.current && containerRef.current) {
      if (
        (containerRef.current.clientWidth &&
          containerRef.current.clientHeight) === 0
      ) {
        const resizeObserver = new ResizeObserver(() => {
          resizeObserver.disconnect();
          handleSetDefault();
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
      }

      handleSetDefault();
    }
  }, [contentRef, containerRef]);

  const getDefaultScale = () => {
    if (containerRef.current && contentRef.current) {
      const xScale =
        contentRef.current?.clientWidth / containerRef.current?.clientWidth;
      const yScale =
        contentRef.current?.clientHeight / containerRef.current?.clientHeight;
      return Math.min(xScale, yScale) || 1;
    } else {
      return 1;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const position: IPosition = { x: e.screenX, y: e.screenY };
    const event = handleUpdatePosition(position);
    const removeEvent = () => {
      window.removeEventListener('mousemove', event);
      window.removeEventListener('mouseup', removeEvent);
    };
    window.addEventListener('mousemove', event);
    window.addEventListener('mouseup', removeEvent);
    return true;
  };

  const handleUpdatePosition = (pos: IPosition) => (e: MouseEvent) => {
    const top = position.top - (pos.y - e.screenY) / position.scale;
    const left = position.left - (pos.x - e.screenX) / position.scale;
    setPosition((position) => ({ ...position, left, top }));
  };

  const handleSetScale = (scale: number) => () =>
    setPosition((pos) => ({ ...pos, scale: pos.scale + scale }));

  return (
    <div className={`DocumentViewer`}>
      <div className="DocumentViewer-Content" ref={contentRef}>
        <div
          ref={documentRef}
          className="DocumentViewer-Document"
          style={{
            left: position.left,
            top: position.top,
            transform: `scale(${position.scale})`,
          }}
        >
          <div className="DocumentViewer-ShadowContainer">
            <shadowRoot.div className="DocumentViewer-ShadowRoot">
              <div ref={containerRef}>
                {template && (
                  <div dangerouslySetInnerHTML={{ __html: template }} />
                )}
              </div>
            </shadowRoot.div>
          </div>
        </div>
        <div
          className="DocumentViewer-ContentDrag"
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className="DocumentViewer-ControlButtons">
        <button onClick={handleSetDefault} />
        <button onClick={handleSetScale(step)} />
        <button
          //  isDisabled={position.scale - step < 0.1}
          onClick={handleSetScale(-step)}
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
