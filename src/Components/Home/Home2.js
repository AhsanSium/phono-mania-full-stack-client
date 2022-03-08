import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import Hero from "../../Components/hero/TwoColumnWithVideo.js";
import Features from "../../Components/features/ThreeColSimple.js";
import MainFeature from "../../Components/features/TwoColWithButton.js";
import MainFeature2 from "../../Components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "../../Components/cards/TabCardGrid.js";
import Testimonial from "../../Components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "../../Components/cta/DownloadApp.js";
import Header from "../../Components/headers/light";
import Footer from "../../Components/footers/FiveColumnWithInputForm.js";
import chefIconImageSrc from "../../images/chef-icon.svg";
import celebrationIconImageSrc from "../../images/celebration-icon.svg";
import shopIconImageSrc from "../../images/shop-icon.svg";
import delivery from '../../images/fast-delivery.png';
import smartphoneBG from '../../images/smartphone image 2.jpg'

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-indigo-600 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl w-full`;

  const [products, setProducts] = useState({
    loading: false,
    data: null,
  });

  // useEffect(()=>{
  // setProducts({ loading: true });
  // fetch('https://cherry-pie-50881.herokuapp.com/products3')
  // .then(res => res.json())
  // .then(data => {
  //     console.log(data);
  //     setProducts({ loading: false, data:data });
  // })
  // .catch((err) => {
  //   console.log(err)

  //   setTimeout(()=>{
  //       const reload = window.confirm(err + '\n Press OK to reload');
  //       if(reload === true){
  //           document.location.reload()
  //       }
  //   }, 3000)
  // });
  // },[setProducts]);

  return (
    <>
    {/* <Header /> */}
    <AnimationRevealPage>
      <Hero
        heading={<>Latest & Flagship <HighlightedText>SmartPhones</HighlightedText></>}
        description="Check out our latest smartphones collection. We have all kinds of smartphones available with very attractive price"
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Meet The Chefs"
      />
      {/* <MainFeature
        subheading={<Subheading>Established Since 2014</Subheading>}
        heading={
          <>
            We've been serving for
            <wbr /> <HighlightedText>over 5 years.</HighlightedText>
          </>
        }
        description={
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            <br />
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Latest Offers"
        imageSrc={
          "https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        }
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      /> */}
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        // data={products}
        heading={
          <>
            Checkout our <HighlightedText>Smartphones.</HighlightedText>
          </>
        }
      />
      <Features
        heading={
          <>
            Amazing <HighlightedText>Services.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "230+ Locations",
            description: "We Cover All of these locations",
            url: ""
          },
          {
            imageSrc: delivery,
            title: "Super Fast Delivery",
            description: "We Deliver All the products on time right in front of your doors",
            url: ""
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Amaizing Discounts",
            description: "We provide amaizing discounts and the best price available in the market",
            url: ""
          }
        ]}

        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Reputed Online Store</Subheading>}
        heading={<>Why <HighlightedText>Choose Us ?</HighlightedText></>}
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+"
          },
          {
            key: "Logistics",
            value: "1500+"
          }
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc={smartphoneBG}
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Customers <HighlightedText>Love Us.</HighlightedText></>}
      />
      <DownloadApp
        text={<>People around you are ordering awesome Smart Phones using the <HighlightedTextInverse>PhonoMania App.</HighlightedTextInverse></>}
      />
      <Footer />
    </AnimationRevealPage>
    </>
    
  );
}
