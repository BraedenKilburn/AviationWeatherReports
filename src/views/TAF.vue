<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggyMountains.mp4" playsinline muted loop autoplay></video>
                <div class="overlay taf"></div>
                <div class="text metar">
                    <div class="row metar" id="airportName">
                        <!-- Airport Header -->
                    </div>
                    <div class="row metar" id="startingTime">
                        <!-- From Header -->
                    </div>
                    <div class="row metar" id="endingTime">
                        <!-- To Header -->
                    </div>
                    <div class="container metar taf mt-4 mt-lg-0" id="tafTable">
                        <div class="text index">
                            <h2>TAF Forecast</h2>
                            <h3>Aviation Weather Reports</h3>
                            <form class="d-flex justify-content-center mt-4 mr-4 mainForm" action="">
                                <input type="search" id="mainICAO" placeholder="Airport ICAO" autocorrect="off">
                                <button type="submit" class="btn btn-outline-light">Search</button>
                            </form>
                            <div class=" error mt-5 p-3"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

</template>

<style scoped>
.overlay.taf {
    background: rgba(0, 0, 0, 0.6);
}
</style>