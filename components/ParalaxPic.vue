<template>
    <div class="w-full h-[60vh] relative">
        <div class="absolute flex h-[60vh] w-full items-center justify-center  bg-cover bg-fixed bg-[50%] bg-no-repeat bg-[url(/media/pic1.jpg)]"></div>
        <div>
            <div class="absolute flex h-[60vh] w-full items-center justify-center font-[Impact]">
            

            </div>
        </div>
    </div>
</template>
<style scoped>

.fadein:hover {
  -webkit-backdrop-filter: blur(50px);
  -webkit-text-stroke: 1px #fff;
}
@keyframes fadein {
  0% {
    opacity: 0;
    transform: translate(100px);
  }

  to {
    opacity: 1;
    transform: translate(0);
  }
}

</style>