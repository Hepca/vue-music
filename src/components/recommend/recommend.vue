<template>
  <div class="recommend">
      <Scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
            <div class="slider-wrapper" v-if="recommends.length">
                <Slider>
                    <div v-for="(item, index) in recommends" :key="index">
                        <a :href="item.linkUrl">
                            <img class="needsclick" @onload="loadImage" :src="item.picUrl" />
                        </a>
                    </div>
                </Slider>
            </div>
            <div class="recommend-list">
              <h1 class="list-title">热门歌单推荐</h1>
              <ul>
                <li class="item" v-for="(item, index) in discList" :key="index">
                    <div class="icon">
                        <img width="60" height="60" v-lazy="item.imgurl" />
                    </div>
                    <div class="text">
                        <h2 class="name">{{item.creator.name}}</h2>
                        <p class="desc">{{item.dissname}}</p>
                    </div>
                </li> 
              </ul>
            </div>
        </div>
        <div class="loading-container" v-if="!discList.length">
            <loading></loading>
        </div>
      </Scroll>
  </div>
</template>

<script>
import { queryBannerList, queryRecommendList } from 'api/index'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/index'
import loading from 'base/loading/index'
export default {
    components: {
        Slider,
        Scroll,
        loading
    },
    data() {
        return {
            recommends: [],
            discList: [],
            isloading: false,
        }
    },
    methods: {
        _getRecommend() {
            queryBannerList({}).then((res) => {
                this.recommends = res.data.data.slider
            })
        },
        _getDiscList() {
            queryRecommendList().then((res) => {
                this.discList = res.data.data.list
            })
        },
        loadImage() {
            if (!this.checkLoading) {
                 this.$.scroll.refresh()
                 this.checkLoading = true
            }
           
        }
    },
    mounted() {
        this._getRecommend()
        this._getDiscList()
    },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    .recommend 
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content 
            height: 100%
            overflow: hidden
            .slider-wrapper 
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item 
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
                    .loading-container
                        position: absolute
                        width: 100%
                        top: 50%
                        transform: translateY(-50%)
                
</style>