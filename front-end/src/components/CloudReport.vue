<template>
    <div class="col-md-4 col-sm-12 mb-3" id="clouds">
        <img height="70px" src="/images/cloud.svg" alt="Cloud">
        <h3 class="m-0 pb-2">Clouds (AGL): </h3>
    </div>
</template>

<script>
export default {
    name: "Clouds",
    data() {
        return {
            clouds: this.$root.$data.metarInfo.clouds,
        }
    },
    mounted() {
        // Do this after the page has been loaded
        this.$nextTick(function () {
            for (let i = 0; i < this.clouds.length; i++)
            {
                if (i === this.clouds.length - 1)
                {
                    if (this.clouds[i].code === "CLR")
                    {
                        document.querySelector("#clouds").innerHTML += "<h3>" + this.clouds[i].text + "</h3>";
                    }
                    else
                    {
                        document.querySelector("#clouds").innerHTML +=
                            "<h3>" +
                            this.clouds[i].text +
                            " at " +
                            this.clouds[i].base_feet_agl.toLocaleString() +
                            "'</h3>";
                    }
                }
                else
                {
                    document.querySelector("#clouds").innerHTML +=
                        '<h3 class="m-0 pb-0">' +
                        this.clouds[i].text +
                        " at " +
                        this.clouds[i].base_feet_agl.toLocaleString() +
                        "'</h3>";
                }
            }
        })
    },
}
</script>