<template>
    <main>
        <div class="container-fluid">
            <section class="showcase airport d-flex justify-content-center align-items-top text-center">
                <video src="/videos/valley.mp4" playsinline muted loop autoplay></video>
                <div class="overlay"></div>
                <div class="text">
                    <!-- Airport Name Heading -->
                    <div class="row text-center" id="airportName"></div>
                    <div class="container">
                        <div class="text index">
                            <h2>Airport Information</h2>
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

.showcase.airport {
    padding: 0%;
}

</style>