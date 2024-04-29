// ~-- Loading -->

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(1000);
    $("body").css("overflow", "visible");
  });
});

// !-- Nav Side -->

$(".side-nav").css("left", -$(".side-nav-inner").innerWidth());
$("#closeIcon").fadeOut(0);
$(".side-nav ul li").css("top", 150);

let left = $(".side-nav-inner").innerWidth();

function closeSideNav() {
  $(".side-nav").css("left", -left);
  $("#closeIcon").fadeOut(0);
  $("#openIcon").fadeIn(0);
  $(".side-nav ul li").animate({ top: 150 }, 80);
}

function openSideNav() {
  $(".side-nav").css("left", 0);
  $("#closeIcon").fadeIn(0);
  $("#openIcon").fadeOut(0);
  for (let i = 0; i < 6; i++) {
    $(".side-nav ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 2) * 80);
  }
}

$(".menuIcon").on("click", function () {
  if ($(".side-nav").css("left") === "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// function openSideNav() {
//   $(".side-nav-menu").animate({left: 0, },500);
//   $(".open-close-icon").removeClass("fa-align-justify");
//   $(".open-close-icon").addClass("fa-x");

//   for (let i = 0; i < 5; i++) {
//    $(".links li").eq(i).animate({top: 0,},(i + 5) * 100);}}

// function closeSideNav() {
//   let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
//   $(".side-nav-menu").animate(
//     {left: -boxWidth,},500);

//   $(".open-close-icon").addClass("fa-align-justify");
//   $(".open-close-icon").removeClass("fa-x");
//   $(".links li").animate({top: 300,},500);
// }

// closeSideNav();
// $(".side-nav-menu i.open-close-icon").click(() => {
//   if ($(".side-nav-menu").css("left") == "0px") {
//     closeSideNav();
//   } else {
//     openSideNav();
//   }
// });
