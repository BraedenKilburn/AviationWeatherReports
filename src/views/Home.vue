<template>
  <div class="home">
    <main>
      <div class="container-fluid">
        <section class="showcase d-flex justify-content-center align-items-top text-center">
          <video src="videos/clouds.mp4" playsinline muted loop autoplay></video>
          <div class="text index mt-0 mt-lg-3">
            <h2>Aviation Weather Reports</h2>
            <h3>Keep your head out of the clouds</h3>
            <form class="d-flex justify-content-center mt-4 mr-4 mainForm" action="">
                <input type="search" name="airportCode" id="mainICAO" placeholder="Airport ICAO" autocorrect="off">
                <button type="submit" class="btn btn-outline-light">Search</button>
            </form>
            <div class=" error mt-5 p-3"></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
