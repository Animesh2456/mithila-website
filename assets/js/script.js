// Typed JS Initialization
var typed = new Typed("#typed", {
    strings: ["CUSTOMER", "PRODUCT", "ENGAGEMENT"],
    // typeSpeed: 60,
    // backSpeed: 40,
    // loop: true,
    // loopCount: Infinity
    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
    stringsElement: null,
    // typing speed
    typeSpeed: 30,
    // time before typing starts
    startDelay: 300,
    // backspacing speed
    backSpeed: 20,
    // time before backspacing
    backDelay: 900,
    // loop
    loop: true,
    // false = infinite
    // loopCount: 5,
    // show cursor
    showCursor: false,
    // character for cursor
    cursorChar: "_",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: "html"
});

// Swiper
var swiper = new Swiper(".sec_testimonials .swiper-container", {
    effect: "coverflow",
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        // rotate: 50, //original
        rotate: 0,
        // stretch: 1, //original
        stretch: 1,
        // depth: 100, //original
        depth: 900,
        // modifier: 1, //original
        modifier: 1,
        slideShadows: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

var swiper1 = new Swiper(".sec_clients .swiper-container", {
    slidesPerView: 4,
    spaceBetween: 10,
    centeredSlides: false,
    grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    }
});
var swiper2 = new Swiper(".sec_integrate .swiper-container", {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    centeredSlides: false,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    }
});

// video sections slider
$(".slider").slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
});

//ticking machine
var percentTime;
var tick;
var time = 0.1;
var progressBarIndex = 0;

$(".progressBarContainer .progressBar").each(function(index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
});

function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 10);
}

function interval() {
    if (
        $(
            '.slider .slick-track div[data-slick-index="' +
                progressBarIndex +
                '"]'
        ).attr("aria-hidden") === "true"
    ) {
        progressBarIndex = $(
            '.slider .slick-track div[aria-hidden="false"]'
        ).data("slickIndex");
        startProgressbar();
    } else {
        percentTime += 1 / (time + 5);
        $(".inProgress" + progressBarIndex).css({
            width: percentTime + "%"
        });
        if (percentTime >= 100) {
            $(".single-item").slick("slickNext");
            progressBarIndex++;
            if (progressBarIndex > 2) {
                progressBarIndex = 0;
            }
            startProgressbar();
        }
    }
}

function resetProgressbar() {
    $(".inProgress").css({
        width: 0 + "%"
    });
    clearInterval(tick);
}
startProgressbar();
// End ticking machine

$(".item").click(function() {
    clearInterval(tick);
    var goToThisIndex = $(this)
        .find("span")
        .data("slickIndex");
    $(".single-item").slick("slickGoTo", goToThisIndex, false);
    startProgressbar();
});
