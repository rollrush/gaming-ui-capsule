import { useEffect } from "react";
import { Menu, X } from "lucide-react";

// Import styles if using v3.5.0 or greater of `@usecapsule/react-sdk`
import "@usecapsule/react-sdk/styles.css";
import { Link } from "react-router-dom";
import { useWalletStore } from "../store/store";

// not sensitive

const menuItems = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "RollRush",
    href: "/games/rollrush",
  },
  {
    name: "Diceup",
    href: "/games/diceup",
  },
  {
    name: "Magnetic Chess",
    href: "/games/can",
  },
];

function Navbar() {
  const {
    checkIfLoggedIn,
    toggleMenu,
    walletAddress,
    isMenuOpen,
    updateWalletAddress,
  } = useWalletStore();

  useEffect(() => {
    checkIfLoggedIn();
    console.log(walletAddress, " this is wallet");
  }, []);

  const btnhandler = () => {
    // Asking if metamask is already present or not
    if ((window as any).ethereum) {
      // res[0] for fetching a first wallet
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: any) => updateWalletAddress(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  return (
    <div className="relative w-full backdrop-blur-md h-max">
      {/* <CapsuleModal
        className=""
        capsule={capsule}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        appName="RollRush"
        oAuthMethods={[
          OAuthMethod.GOOGLE,
          OAuthMethod.TWITTER,
          OAuthMethod.DISCORD,
        ]}
      /> */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 34 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="ui-gambling-website-lined-icnos-casinoshunter"
                  transform="translate(-342.000000, -412.000000)"
                  fill="white"
                  fillRule="nonzero"
                >
                  <g
                    id="square-filled"
                    transform="translate(50.000000, 120.000000)"
                  >
                    <path
                      d="M310,292 C319.941125,292 328,300.058875 328,310 C328,319.941125 319.941125,328 310,328 C300.058875,328 292,319.941125 292,310 C292,300.058875 300.058875,292 310,292 Z M301.294248,319.654671 L299.170997,321.778603 C301.791406,324.189005 305.218288,325.736217 309.000703,325.969301 L309.000433,322.962143 C306.045865,322.737484 303.367339,321.525196 301.294248,319.654671 Z M311.00057,322.962067 L311.000299,325.96924 C314.925065,325.727139 318.466977,324.07013 321.122218,321.502031 C321.060882,321.463298 321.003054,321.417268 320.949747,321.363961 L318.982613,319.39751 C316.874016,321.41358 314.088037,322.727064 311.00057,322.962067 Z M310,299 C303.924868,299 299,303.924868 299,310 C299,316.075132 303.924868,321 310,321 C316.075132,321 321,316.075132 321,310 C321,303.924868 316.075132,299 310,299 Z M297.037933,311.00057 L294.03076,311.000299 C294.249702,314.549627 295.625803,317.785845 297.786439,320.336328 L299.916055,318.205164 C298.290292,316.209562 297.245091,313.722203 297.037933,311.00057 Z M325.96924,311.000299 L322.962067,311.00057 C322.765131,313.58791 321.810814,315.963525 320.320332,317.906198 L322.363961,319.949747 C322.395474,319.98126 322.424444,320.014353 322.450871,320.048771 C324.475084,317.544377 325.758451,314.417451 325.96924,311.000299 Z M308.585786,304.343146 C309.509185,305.266544 309.704788,306.642136 309.172598,307.75711 L310.000707,308.585079 L310.827855,307.758058 C310.295101,306.642915 310.490554,305.266805 311.414214,304.343146 C312.585786,303.171573 314.485281,303.171573 315.656854,304.343146 C316.828427,305.514719 316.828427,307.414214 315.656854,308.585786 C314.733456,309.509185 313.357864,309.704788 312.24289,309.172598 L311.414921,309.999293 L312.24289,310.827402 C313.357864,310.295212 314.733456,310.490815 315.656854,311.414214 C316.828427,312.585786 316.828427,314.485281 315.656854,315.656854 C314.485281,316.828427 312.585786,316.828427 311.414214,315.656854 C310.490554,314.733195 310.295101,313.357085 310.827855,312.241942 L310.000707,311.413506 L309.172598,312.24289 C309.704788,313.357864 309.509185,314.733456 308.585786,315.656854 C307.414214,316.828427 305.514719,316.828427 304.343146,315.656854 C303.171573,314.485281 303.171573,312.585786 304.343146,311.414214 C305.266805,310.490554 306.642915,310.295101 307.758058,310.827855 L308.586494,309.999293 L307.758058,309.172145 C306.642915,309.704899 305.266805,309.509446 304.343146,308.585786 C303.171573,307.414214 303.171573,305.514719 304.343146,304.343146 C305.514719,303.171573 307.414214,303.171573 308.585786,304.343146 Z M305.757359,312.828427 C305.366835,313.218951 305.366835,313.852116 305.757359,314.242641 C306.147884,314.633165 306.781049,314.633165 307.171573,314.242641 C307.562097,313.852116 307.562097,313.218951 307.171573,312.828427 C306.781049,312.437903 306.147884,312.437903 305.757359,312.828427 Z M312.828427,312.828427 C312.437903,313.218951 312.437903,313.852116 312.828427,314.242641 C313.218951,314.633165 313.852116,314.633165 314.242641,314.242641 C314.633165,313.852116 314.633165,313.218951 314.242641,312.828427 C313.852116,312.437903 313.218951,312.437903 312.828427,312.828427 Z M322.031716,299.452745 L319.90526,301.580228 C321.633203,303.611044 322.74768,306.179961 322.962143,309.000433 L325.969301,309.000703 C325.744482,305.352396 324.297069,302.034859 322.031716,299.452745 Z M294.030699,309.000703 L297.037857,309.000433 C297.244834,306.278408 298.290093,303.790683 299.916055,301.794836 L297.786439,299.663672 C295.625599,302.214396 294.249443,305.450982 294.030699,309.000703 Z M305.757359,305.757359 C305.366835,306.147884 305.366835,306.781049 305.757359,307.171573 C306.147884,307.562097 306.781049,307.562097 307.171573,307.171573 C307.562097,306.781049 307.562097,306.147884 307.171573,305.757359 C306.781049,305.366835 306.147884,305.366835 305.757359,305.757359 Z M312.828427,305.757359 C312.437903,306.147884 312.437903,306.781049 312.828427,307.171573 C313.218951,307.562097 313.852116,307.562097 314.242641,307.171573 C314.633165,306.781049 314.633165,306.147884 314.242641,305.757359 C313.852116,305.366835 313.218951,305.366835 312.828427,305.757359 Z M299.170997,298.221397 L301.295247,300.344428 C303.368199,298.474415 306.046339,297.26248 309.000433,297.037857 L309.000703,294.030699 C305.218288,294.263783 301.791406,295.810995 299.170997,298.221397 Z M311.000299,294.03076 L311.00057,297.037933 C313.856347,297.255301 316.454186,298.39536 318.496627,300.160647 L320.623025,298.035181 C318.030426,295.731653 314.683996,294.257991 311.000299,294.03076 Z"
                      id="roulette"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span className="font-bold text-white text-2xl underline decoration-yellow-500 ">
            RollRush
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8 text-white items-center">
            <Link to="/" className=" ">
              <span className="text-yellow-500 font-bold">H</span>ome
            </Link>
            <Link to="/about">
              <span className="text-yellow-500 font-bold">A</span>bout
            </Link>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="m-1 text-white py-2 px-4 bg-yellow-600 rounded-full font-bold "
              >
                Games
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    className="bg-gray-700 text-yellow-600 mb-2 hover:text-white hover:bg-yellow-600"
                    to="/games/rollrush"
                  >
                    Roll Rush
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-gray-700 text-yellow-600 hover:text-white hover:bg-yellow-600 active:text-red-500"
                    to="/games/diceup"
                  >
                    Dice Up
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-gray-700 mt-2 text-yellow-600 hover:text-white hover:bg-yellow-600 active:text-red-500"
                    to="/games/can"
                  >
                    Magnetic chess
                  </Link>
                </li>
              </ul>
            </div>
            {/* <Link to="/diceup">Diceup</Link> */}
          </ul>
        </div>
        <div className=" ">
          <button
            onClick={btnhandler}
            className="h-auto ml-4 bg-white text-black rounded-full  py-2 px-4"
          >
            {walletAddress}
          </button>
          <button
            onClick={() => toggleMenu()}
            className="mt-4 w-full rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Capsule
          </button>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">RollRush</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Capsule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
