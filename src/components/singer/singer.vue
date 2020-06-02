<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script>
import ListView from '../../base/listview/index'
import { querySingerList } from 'api/index'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'
const HOT_SIGER_LEN = 10
export default {
  data () {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  methods: {
    _getSingerList() {
      querySingerList().then((res) => {
       this.singers = this._normalizeSinger(res.data.data.list)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SIGER_LEN) {
           map.hot.items.push(new Singer({
             id: item.Fsinger_mid,
             name: item.Fsinger_name
           }))
        }
        const key = item.Findex
        if(!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  mounted () {
     this._getSingerList()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>