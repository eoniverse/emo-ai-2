<template>
    <div>
    <div class="font-[Impact] absolute z-[1000] flex h-[1vh] w-full items-start justify-between p-5">
        <NuxtLink class="logo " to="/">
            <NuxtImg class="logoin fixed w-[clamp(3rem,4vw,4rem)]" src="/pic180.png" alt="logo"/>
        </NuxtLink>

        <!-- <div class="fixed flex h-[10vh] w-[98%] cursor-pointer items-start justify-end">
            <NuxtLink class="cir_btn list-none relative m-[15px] inline-block text-[clamp(.3rem,3vw,2rem)] text-white transition-[0.3s] hover:text-transparent" to="/">HOME</NuxtLink>
            <NuxtLink class="cir_btn list-none relative m-[15px] inline-block text-[clamp(.3rem,3vw,2rem)] text-white transition-[0.3s] hover:text-transparent" to="/about">ABOUT</NuxtLink>
            <NuxtLink class="cir_btn list-none relative m-[15px] inline-block text-[clamp(.3rem,3vw,2rem)] text-white transition-[0.3s] hover:text-transparent" to="/connect">CONNECT</NuxtLink>
        </div> -->
    </div>
    </div>
</template>

<style scoped>
.cir_btn:hover {
  -webkit-text-stroke: 1px #fff;
}
</style>