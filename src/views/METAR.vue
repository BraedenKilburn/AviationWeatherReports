<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/foggy.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>
                <div class="text metar">
                    <div class="row metar" id="airportName">
                        <!-- Airport Name -->
                    </div>
                    <div class="row metar" id="observedTime">
                        <!-- METAR Observed Time -->
                    </div>
                    <div class="row metar justify-content-center" id="flightCategory">
                        <!-- Flight Category (VFR, MVFR, IFR, LIFR) -->
                    </div>
                    <div class="container metar mt-4 mt-lg-0">
                        <div class="text index">
                            <h2>METAR Report</h2>
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

</style>