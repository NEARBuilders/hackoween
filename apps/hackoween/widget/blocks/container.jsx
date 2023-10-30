
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.375);
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  background-color: var(--paper);
  padding: 20px;

  @media (min-width: 768px) {
    width: 80%;
    height: 80%;
    overflow: hidden;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  margin: 10px 20px 0 20px;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: var(--base900);

    i {
      font-size: 2em;
    }
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: 3em;
  font-weight: bold;
`;
const ButtonRow = styled.div`
  display: flex;
`;

function Header() {
  return (
    <StyledHeader>
      <Title>🎃 Hack-o-ween 👻</Title>
      <ButtonRow>
        <a
          href={"https://github.com/nearbuilders/hackoween"}
          alt="Github"
          target="_blank"
          rel="noreferrer"
        >
          <i class="bi bi-github"></i>
        </a>
      </ButtonRow>
    </StyledHeader>
  );
}

const { projects } = props;

let initialProject = projects[0];
if (project) {
  initialProject = projects.find((p) => p.metadata.name === project);
}

const [selectedItem, setSelectedItem] = useState(initialProject);

const handleItemClick = (item) => {
  setSelectedItem(item);
};

return (
  <InnerContainer>
    <Header />
    <div
      className="template"
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      <div
        className="left-panel"
        style={{
          flex: 1,
          maxWidth: "300px",
          width: "100%",
          margin: "20px 20px 80px 20px",
        }}
      >
        <Widget
          src="hackoween.near/widget/blocks.sidebar"
          props={{ handleItemClick, items: projects }}
        />
      </div>
      <div
        className="right-panel"
        style={{ flex: 1, width: 0, overflow: "scroll" }}
      >
        <Widget
          src="hackoween.near/widget/blocks.content"
          props={{ selectedItem }}
        />
      </div>
    </div>
  </InnerContainer>
);
