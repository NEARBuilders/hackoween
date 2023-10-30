let theme = props.theme;
let variables = props.variables;

if (!variables) {
  variables = `
  --black: #100f0f;
  --base950: #4F4A45;
  --base900: #282726;
  --base850: #343331;
  --base800: #403e3c;
  --base700: #575653;
  --base600: #6f6e69;
  --base500: #878580;
  --base300: #b7b5ac;
  --base200: #cecdc3;
  --base150: #dad8ce;
  --base100: #e6e4d9;
  --base50: #f2f0e5;
  --paper: #F6F1EE;
  `;
}

if (!theme) {
  theme = ``;
}

const Root = styled.div`
  ${variables}
  ${theme}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--base950);
`;

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
const [selectedItem, setSelectedItem] = useState(null);

const handleItemClick = (item) => {
  setSelectedItem(item);
};
const StyledHeader = styled.div`
  margin: 10px 20px 0 20px;
`;

const Title = styled.div`
  margin: 0;
  font-size: 3em;
  font-weight: bold;
`;

function Header() {
  return (
    <StyledHeader>
      <Title>Hack-o-ween</Title>
    </StyledHeader>
  );
}
return (
  <Root>
    <Container>
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
              props={{ handleItemClick }}
            />
          </div>
          <div
            className="right-panel"
            style={{ flex: 1, width: 0, height: "80vh", overflow: "scroll" }}
          >
            <Widget
              src="hackoween.near/widget/blocks.content"
              props={{ selectedItem }}
            />
          </div>
        </div>
      </InnerContainer>
    </Container>
  </Root>
);
