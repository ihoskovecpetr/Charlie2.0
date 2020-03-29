import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from "@material-ui/core/styles";

import ReactFullpage from "@fullpage/react-fullpage";

import "./Menu.css";

// import { useMutation, useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import { useXsSize } from "../Hooks/useXsSize";

import Carousel from "../Atoms/carousel";
import Screen1 from "../Molecules/menu/screen_1";
import Screen1Mobile from "../Molecules/menu/Screen1Mobile";
import ScreenHowItWorks from "../Molecules/menu/Screen_2_HowItWorks";
import Screen2 from "../Molecules/menu/screen_2";
import Screen3 from "../Molecules/menu/screen_3";
import Screen4 from "../Molecules/menu/screen_4";
import Posts from "../Molecules/menu/posts";
import Screen6 from "../Molecules/menu/screen_6";
import BlogPost1 from "../Molecules/menu/blog/BlogPost1";
import BlogPost2 from "../Molecules/menu/blog/BlogPost2";
import BlogPost3 from "../Molecules/menu/blog/BlogPost3";

// const USER_NEW_BOOKINGS = gql`
//   mutation newestUserBookings($user_id: ID!) {
//     newestUserBookings(user_id: $user_id) {
//       event {
//         _id
//         name
//         description
//         dateStart
//         imagesArr {
//           caption
//           src
//           thumbnail
//           thumbnailHeight
//           thumbnailWidth
//           scaletwidth
//           marginLeft
//           vwidth
//         }
//         author {
//           _id
//           name
//           picture
//         }
//       }
//     }
//   }
// `;

export default function Menu(props) {
  const classes = useStyles();

  // const { context } = useContext(UserContext);
  const { xs_size_memo } = useXsSize();
  const [windowHeight, setWindowHeight] = useState(0);

  // const [newBookingsArr, { loading, error, data }] = useMutation(
  //   USER_NEW_BOOKINGS,
  //   {
  //     variables: { user_id: context._id }
  //   }
  // );

  useEffect(() => {
    console.log("Scroll TOP")
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(
      "UseEffect Find out if document has property onclick ",
      "onclick" in document.createElement("div") ? "Joo" : "Noo"
    );

      setWindowHeight(window.innerHeight)

  }, []);


  // if (context.success) {
  //   {
  //     !loading && !data && newBookingsArr();
  //   }
  // }

  const fullpageOptions = {
    anchors: ["firstPage", "secondPage", "thirdPage"],
    sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
    callbacks: ["onLeave"],
    scrollOverflow: true
  };
if( false){ //!xs_size_memo &&
  //   return (
  //   <ReactFullpage
  //     {...props}
  //     slidesNavigation={false}
  //     navigation={!xs_size_memo}
  //     //navigationTooltips={["firstSlide", "secondSlide"]}
  //     onLeave={function(origin, destination, direction) {
  //       switch (destination.index) {
  //         case 1:
  //           document.getElementById("s_2_id").style.display = "block";
  //           break;
  //         case 2:
  //           document.getElementById("s_3_id").style.display = "block";
  //           break;
  //         case 3:
  //           document.getElementById("s_4_id").style.display = "block";
  //           break;
  //         case 4:
  //           if (document.getElementById("s_posts_id")) {
  //             document.getElementById("s_posts_id").style.display = "block";
  //           } else {
  //             document.getElementById("s_post_1_id").style.display = "block";
  //           }
  //           break;
  //         case 5:
  //           if (document.getElementById("s_post_2_id")) {
  //             document.getElementById("s_post_2_id").style.display = "block";
  //           }
  //           break;
  //         case 6:
  //           if (document.getElementById("s_post_3_id")) {
  //             document.getElementById("s_post_3_id").style.display = "block";
  //           }
  //           break;
  //       }
  //     }}
  //     render={({ state, fullpageApi }) => {
  //       // if (fullpageApi) {
  //       //   // fullpageApi.setAllowScrolling(user.freezScroll);
  //       // }

  //         return (
  //           <div id="fullpage-wrapper" >
  //             <Screen1 />
  //             <Screen2 />
  //             <Screen3 //loading={loading} data={data} 
  //             />
  //             <Screen4 props={props} />

  //             {/* {xs_size_memo && (
  //               <>
  //               <div
  //                 className="section s5"
  //                 id="s_post_1_id"
  //                 //style={{ display: "none" }}
  //               >
  //                 <Container maxWidth="md">
  //                   <BlogPost1 />
  //                 </Container>
  //               </div>
  //               <div
  //                 className="section s6"
  //                 id="s_post_2_id"
  //                 //style={{ display: "none" }}
  //               >
  //                 <Container maxWidth="md">
  //                   <BlogPost2 />
  //                 </Container>
  //               </div>
  //               <div
  //                 className="section s7"
  //                 id="s_post_3_id"
  //                 //style={{ display: "none" }}
  //                 >
  //                 <Container maxWidth="md">
  //                   <BlogPost3 />
  //                 </Container>
  //               </div>
  //               </>
  //             )} */}

  //             {/* {!xs_size_memo && ( */}
  //               <div className="section s5">
  //                 <Posts />
  //               </div>
  //             {/* )} */}

  //             <Screen6 />
  //           </div>
  //       );
  //     }}
  //   />
  // );
} else {
    // document.getElementById("s_2_id").style.display = "block";
    // document.getElementById("s_3_id").style.display = "block";
    // document.getElementById("s_4_id").style.display = "block";
  return (
      <div id="menu_wrap" className={classes.menuWrap} style={{position: "absolute", top: 0, overflow: "hidden"}}>
        {xs_size_memo ? <Screen1Mobile /> : <Screen1 />}
        <ScreenHowItWorks />
        <Screen2 />
        <Screen3 //loading={loading} data={data} 
        />
        <Screen4 props={props} />
        <BlogPost1 />
        <BlogPost2 />
        <BlogPost3 />
        <Screen6 />
      </div>
  )
}

}

const useStyles = makeStyles(theme => ({
  menuWrap: {
    top: 0,
    width: "100%",
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },
  menuButton: {
    background: "white"
  },
  avatar: {
    width: 100,
    height: 100
  },
  gridLogo: {
    textAlign: "center"
  },
  button: {
    width: 100,
    margin: 10,
    fontWeight: "700 !important"
  },
  text: {
    color: "black",
    fontWeight: 400
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white",
    padding: 10,
    marginBottom: 20
  },
  pinkContainer: {
    //ackground: theme.palette.charliePink,
    //color: "white",
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));
