import React from "react";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import { Accordion, Card, Button } from "react-bootstrap";

export function video(vidID) {
  if (vidID.includes("=")) {
    vidID = vidID.split("=")[1];
  }
  if (vidID.includes("&")) {
    vidID = vidID.split("&")[0];
  }

  return (
    <Accordion>
      <Card className="mt-5">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Watch
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <>
            <div className="d-flex justify-content-center mt-2">
              <YouTube
                videoId={vidID}
                opts={{
                  //I have to find the width before I load the video, otherwise controls are cut off.
                  width: `${
                    window.innerWidth < 750
                      ? window.innerWidth < 650
                        ? window.innerWidth / 1.3
                        : window.innerWidth / 1.5
                      : 640
                  }`,
                }}
                onReady={(e) => e.target.pauseVideo()}
              />
            </div>
            <div className="d-flex justify-content-center">
              <a href={`https://www.youtube.com/watch?v=${vidID}`}>
                Youtube Link
              </a>
            </div>
            <hr />
            <div className="d-flex justify-content-center mt-2">
              보고 싶다 이렇게
              <br />
              말하니까 더 보고 싶다
              <br />
              너희 사진을
              <br />
              보고 있어도 보고 싶다
              <br />
              너무 야속한 시간
              <br />
              나는 우리가 밉다
              <br />
              이젠 얼굴 한 번 보는 것 조차
              <br />
              힘들어진 우리가
              <br />
              <br />
              여긴 온통 겨울 뿐이야
              <br />
              팔월에도 겨울이 와<br />
              마음은 시간을 달려가네
              <br />
              홀로 남은 설국열차
              <br />
              니 손 잡고 지구
              <br />
              반대편까지 가<br />
              겨울을 끝내고파
              <br />
              그리움들이
              <br />
              얼마나 눈처럼 내려야
              <br />
              그 봄날이 올까
              <br />
              Friend
              <br />
              <br />
              허공을 떠도는
              <br />
              작은 먼지처럼
              <br />
              작은 먼지처럼
              <br />
              날리는 눈이 나라면
              <br />
              조금 더 빨리 네게
              <br />
              닿을 수 있을 텐데
              <br />
              <br />
              눈꽃이 떨어져요
              <br />
              또 조금씩 멀어져요
              <br />
              보고 싶다 (보고 싶다)
              <br />
              보고 싶다 (보고 싶다)
              <br />
              얼마나 기다려야
              <br />
              또 몇 밤을 더 새워야
              <br />
              널 보게 될까 (널 보게 될까)
              <br />
              만나게 될까 (만나게 될까)
              <br />
              <br />
              추운 겨울 끝을 지나
              <br />
              다시 봄날이 올 때까지
              <br />
              꽃 피울 때까지
              <br />
              그곳에 좀 더 머물러줘
              <br />
              머물러줘
              <br />
              <br />
              니가 변한 건지
              <br />
              (니가 변한 건지)
              <br />
              아니면 내가 변한 건지
              <br />
              (아니면 내가 변한 건지)
              <br />
              이 순간 흐르는 시간조차 미워
              <br />
              우리가 변한 거지 뭐<br />
              모두가 그런 거지 뭐<br />
              <br />
              그래 밉다 니가
              <br />
              넌 떠났지만
              <br />
              단 하루도 너를
              <br />
              잊은 적이 없었지 난<br />
              솔직히 보고 싶은데
              <br />
              이만 너를 지울게
              <br />
              그게 널 원망하기보단
              <br />
              덜 아프니까
              <br />
              <br />
              시린 널 불어내 본다
              <br />
              연기처럼 하얀 연기처럼
              <br />
              말로는 지운다 해도
              <br />
              사실 난 아직 널 보내지 못하는데
              <br />
              <br />
              눈꽃이 떨어져요
              <br />
              또 조금씩 멀어져요
              <br />
              보고 싶다 (보고 싶다)
              <br />
              보고 싶다 (보고 싶다)
              <br />
              얼마나 기다려야
              <br />
              또 몇 밤을 더 새워야
              <br />
              널 보게 될까 (널 보게 될까)
              <br />
              만나게 될까 (만나게 될까)
              <br />
              <br />
              You know it all
              <br />
              You're my best friend
              <br />
              아침은 다시 올 거야
              <br />
              어떤 어둠도 어떤 계절도
              <br />
              영원할 순 없으니까
              <br />
              <br />
              벚꽃이 피나봐요
              <br />
              이 겨울도 끝이 나요
              <br />
              보고 싶다 (보고 싶다)
              <br />
              보고 싶다 (보고 싶다)
              <br />
              조금만 기다리면
              <br />
              며칠 밤만 더 새우면
              <br />
              만나러 갈게 (만나러 갈게)
              <br />
              데리러 갈게 (데리러 갈게)
              <br />
              <br />
              추운 겨울 끝을 지나
              <br />
              다시 봄날이 올 때까지
              <br />
              꽃 피울 때까지
              <br />
              그곳에 좀 더<br />
              머물러줘
              <br />
              머물러줘
              <br />
            </div>
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function YoutubeBox(props) {
  return props.vid ? (
    video(props.vid)
  ) : (
    <p>Grabbing your video, hold tight ---</p>
  );
}

const mapStateToProps = (state) => ({
  vid: state.youtubeVideoId,
});

export default connect(mapStateToProps)(YoutubeBox);
