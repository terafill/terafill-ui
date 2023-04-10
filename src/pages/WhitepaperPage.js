import Navbar from "../components/Navbar";
import KeylanceFooterContainer from "../components/KeylanceFooterContainer";

const WhitepaperPage = () => {
    return (
        <div className="flex items-stretch flex-col justify-start w-screen h-screen" id="main">
            <Navbar />
            <div className="flex justify-center items-center bg-yellow-50 text-3xl flex-1">
                Whitepaper Page
            </div>
            <KeylanceFooterContainer />
        </div>
    );
}

export default WhitepaperPage;