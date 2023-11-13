const Container = styled.div`
  padding: 20px;
  height: auto;
  overflow: auto;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  background-color: #ed7d31;
  color: #f6f1ee;
  padding: 10px 20px;
  border: 2px solid #6c5f5b;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;

  &:hover {
    background-color: #6c5f5b;
    box-shadow: outset 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #4f4a45;
    box-shadow: outset 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 40px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Name = styled.div`
  flex: 1;
  align-self: center;
  font-size: 2em;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const { selectedItem } = props;

const [activeView, setActiveView] = useState("post");

function PostContent({ data }) {
  data = data.post;
  return (
    <div key={JSON.stringify(data)}>
      <Widget
        src="mob.near/widget/MainPage.N.Post.Page"
        props={{ accountId: data.accountId, blockHeight: data.blockHeight }}
        loading={<div style={{ height: "200px" }} />}
      />
    </div>
  );
}

const PrizeContainer = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const PrizeItem = styled.div`
  margin: 10px 0;
  font-size: 16px;
`;

const TotalItem = styled.div`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
`;

const getEmojiForPrize = (name) => {
  switch (name) {
    case "Grand Prize":
      return "🏆";
    case "Build City":
      return "🏙️";
    case "Data Citizens":
      return "👥";
    case "Runner Up":
      return "🥈";
    case "Green Blocks":
      return "♻️"; // Sustainability emoji
    case "Everything":
      return "⚫"; // Black dot emoji
    case "EdgeAI":
      return "🤖";
    case "Builders Badge":
      return "🛠️";
    default:
      return "🎁";
  }
};

const StyledPre = styled.pre`
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  white-space: pre-wrap;
`;


const formatPrizes = (prizes) => {
  const prizeLines = prizes.tracks.map((track) => 
    `${getEmojiForPrize(track.name)} ${track.name}: $${track.amount}`
  );

  const totalAmount = prizes.tracks.reduce((total, track) => total + parseInt(track.amount, 10), 0);
  prizeLines.push(`Total: $${totalAmount}`);

  return prizeLines.join('\n');
};

const TextPost = ({ data, metadata }) => {
  const parsedData = JSON.parse(data);
  const team = parsedData.team.join(", ");
  const prizesText = formatPrizes(parsedData.prizes);
  const nearSocialPost = metadata.linktree.nearsocial;

  return (
    <>
      <button
        className="classic"
        onClick={() => {
          clipboard.writeText(`
**Team**: ${team}
          
**Prizes**:
          ${prizesText}

**Near Social Post**: ${nearSocialPost}
        `);
        }}
      >
        Copy to clipboard
      </button>
      <StyledPre>
**Team**: {team}
**Prizes**:
{prizesText}
**Near Social Post**: {nearSocialPost}
      </StyledPre>
    </>
  );
};

function PrizesContent({ data }) {
  data = data.prizes;
  if (!data.tracks) {
    return <h3>No Prizes Won</h3>;
  }

  const totalAmount =
    data.tracks.length &&
    data.tracks.reduce((total, track) => total + parseInt(track.amount, 10), 0);
  return (
    <div key={JSON.stringify(data)}>
      {data.tracks.length && (
        <PrizeContainer>
          {data.tracks.map((track) => (
            <PrizeItem key={track.name}>
              {getEmojiForPrize(track.name)} {track.name}: ${track.amount}
            </PrizeItem>
          ))}
          <TotalItem>Total: ${totalAmount}</TotalItem>
        </PrizeContainer>
      )}
      {data.postId ? (
        <Widget
          src="devhub.near/widget/devhub.entity.post.Post"
          props={{ id: data.postId }}
          loading={<div style={{ height: "200px" }} />}
        />
      ) : (
        totalAmount !== 0 && (
          <p>
            No post found. Reply to the following{" "}
            <a
              href="https://near.social/devhub.near/widget/app?page=post&id=1485"
              target="_blank"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Original Hackathon Proposal Post
            </a>{" "}
            as a "Solution" with the following content:
            
            <TextPost
              data={selectedItem.data}
              metadata={selectedItem.metadata}
            />
            
            Once this is done, the NEAR DevHub team will be getting in touch
            with you to remit your payments.
          </p>
        )
      )}
    </div>
  );
}

if (!selectedItem) {
  return <></>;
}

return (
  <Container>
    <Header>
      <Logo>
        <ImageWrapper>
          <Image
            src={selectedItem.metadata.image.href}
            alt={selectedItem.metadata.name}
          />
        </ImageWrapper>
        <Name>{selectedItem.metadata.name}</Name>
      </Logo>
      <ButtonRow>
        <Button
          onClick={() => setActiveView("post")}
          className={activeView === "post" ? "active" : ""}
        >
          Post
        </Button>
        <Button
          onClick={() => setActiveView("demo")}
          className={activeView === "demo" ? "active" : ""}
        >
          Demo
        </Button>
        <Button
          onClick={() => setActiveView("prizes")}
          className={activeView === "prizes" ? "active" : ""}
        >
          Prizes
        </Button>
        <Button
          onClick={() => setActiveView("data")}
          className={activeView === "data" ? "active" : ""}
        >
          Data
        </Button>
      </ButtonRow>
    </Header>
    <Content>
      {activeView === "post" && (
        <PostContent data={JSON.parse(selectedItem.data)} />
      )}
      {activeView === "demo" && (
        <Widget src={JSON.parse(selectedItem.data).demo} />
      )}
      {activeView === "prizes" && (
        <PrizesContent data={JSON.parse(selectedItem.data)} />
      )}
      {activeView === "data" && (
        <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
      )}
    </Content>
  </Container>
);
