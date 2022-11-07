import React from 'react';
import './sticker.styles.scss';

const Sticker = ({ props }: any) => {
  const urlSticker: any = [
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43518&size=130&checksum=0db6cede7fdaaa591c0f0493636d3941',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43519&size=130&checksum=a07f4558261f6efc7f00da115c33dfe6',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43517&size=130&checksum=df23a9bedad54a14e49a825c070c5ced',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43523&size=130&checksum=85803b1a4d049e495049ec2a338b6605',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43516&size=130&checksum=e4c93183903a4e2d323d73fc083ade0c',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43520&size=130&checksum=5db597333a5f8bcab8fc7d53e7bb8886',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43521&size=130&checksum=7324568477341bbfb59045f9cffd28fe',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43522&size=130&checksum=5e20ab5dde3f3623b5f673770d0c3668',
    },
    {
      uri: 'https://zalo-api.zadn.vn/api/emoticon/sprite?eid=43528&size=130&checksum=4329e07a04e09543312b12f4b141bd8f',
    },
  ];

  return (
    <div className="sticker-container">
      <div className="title">GIF</div>
      <div className="grid-container">
        {urlSticker.map((sticker: any) => {
          return (
            <div className="grid-item">
              <div
                key={sticker.uri}
                style={{
                  width: '65px',
                  height: '65px',
                  backgroundSize: '1105px 65px',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: '0px 0px',
                  backgroundImage: `url(${sticker.uri})`,
                }}
              ></div>
            </div>
          );
        })}

        {/* <div className="grid-item">
          <img
            src="https://media-ten.z-cdn.me/9HkzSQ2-aP0AAAAM/taylor-swift.gif"
            alt=""
          ></img>
        </div>
        <div className="grid-item">
          <img
            src="https://media-ten.z-cdn.me/9HkzSQ2-aP0AAAAM/taylor-swift.gif"
            alt=""
          ></img>
        </div>
        <div className="grid-item">
          <img
            src="https://media-ten.z-cdn.me/9HkzSQ2-aP0AAAAM/taylor-swift.gif"
            alt=""
          ></img> */}
        {/* </div> */}
        {/* <div className="grid-item">
          <img
            src="https://media-ten.z-cdn.me/9HkzSQ2-aP0AAAAM/taylor-swift.gif"
            alt=""
          ></img>
        </div>
        <div className="grid-item">
          <img
            src="https://media-ten.z-cdn.me/9HkzSQ2-aP0AAAAM/taylor-swift.gif"
            alt=""
          ></img>
        </div> */}
      </div>
    </div>
  );
};

export default Sticker;
