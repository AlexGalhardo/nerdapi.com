import { CSSProperties } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function About() {
    return (
        <>
            <Navbar />

            <div className="container col-lg-6 mt-5" style={containerContact}>
                <div className="row mt-5">
                    <div className="container col-lg-12 mt-5" style={containerContact}>
                        <h3>About Us</h3>

						<p>Welcome to Nerd API, your go-to destination for comprehensive video game information. We're passionate about providing gamers, developers, and enthusiasts with a rich and detailed database of video games from all genres and platforms. Our platform is dedicated to offering a seamless experience, making it easy for you to discover, explore, and stay up-to-date with the latest in the gaming world.</p>

						<h3>Our Mission</h3>

						<p>Our mission at Nerd API is to create a centralized hub for all things gaming. We believe in the power of information and the impact it has on enhancing the gaming experience. Beyond offering an extensive catalog of games, we provide a robust API subscription service that allows developers and businesses to seamlessly integrate our database into their platforms, unlocking a wealth of gaming knowledge and insights. With our API, you can access a treasure trove of data, from game descriptions and reviews to release dates and platform compatibility.</p>

						<h3>Why use Nerd API?</h3>

						<p>When you choose Nerd API, you're gaining access to a wealth of meticulously curated information about the gaming world. Our API is designed with developers in mind, offering easy integration, comprehensive documentation, and top-notch support. Whether you're building a gaming app, website, or platform, our API empowers you to deliver an unparalleled user experience. Join us in revolutionizing how the world interacts with gaming information. Explore our subscription plans today and take your gaming project to the next level.</p>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

const containerContact: CSSProperties = {
    marginTop: "300px",
};
