import Navbar from "./components/Navbar";
import "./style.css";
function App() {
  return (
    <>
      <Navbar />
      {/* <div className="capsule-button">
        <CapsuleButton capsule={capsule} appName="Vite Example" oAuthMethods={[OAuthMethod.GOOGLE]} />
      </div>
      <div className="body">
        <br />
        <button
          onClick={checkIfLoggedIn}
        >
          Check if logged in
        </button>
        {walletAddress ? <h2>User is logged in!</h2> : <h2>User is not logged in.</h2> }
        {walletAddress &&
          <button
            onClick={signMessage}
          >Sign Message</button>
        }
        <br />
        {walletAddress && <h3>Wallet Address: {walletAddress}</h3>}
        <br />
        {messageSignature && <h3>Message Signature for "{MESSAGE_TO_SIGN}": {messageSignature}</h3>}
        {errorMessage && <h3 style={{
          color: 'red',
        }}>Error: {errorMessage}</h3>}
      </div> */}
    </>
  );
}

export default App;
