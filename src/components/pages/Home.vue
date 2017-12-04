<template>
  <v-container grid-list-md class="custom-layout">
    <v-layout row class="mt-3">
      <v-flex sm8 offset-sm2>
        <img src="https://elevatenv.com/wp-content/uploads/2017/07/Elevate-elements-Web-banner-728x90.jpg" style="width:100%" alt="">
      </v-flex>
    </v-layout>
    <div class="mt-3">
      <h1 class="display-1 mt-2 mb-2">Top Articles</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <v-flex d-flex xs12 sm6>
          <v-card :to="{name: 'PostDetail', params: {id:123}}">
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/santa-letter-780x641.jpg" height="300px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h4 class="custom-headline headline mb-0">Making your list and checking it twice</h4>
                <div class="subheading">Nevada’s dispensaries have a wide variety of gifting ideas for the cannasseur in your life</div>
              </div>
            </v-card-title>
              <v-list two-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                      <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card>
                <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/Franklin.jpg" height="100px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h4 class="custom-headline headline mb-0">A dog’s tale</h4>
                  </div>
                </v-card-title>
                <v-list two-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                      <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card>
                <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/trim-1-1140x641.jpg" height="100px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h4 class="custom-headline headline mb-0">Trimming services: save money and time</h4>
                  </div>
                </v-card-title>
                <v-list two-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                      <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin-top:40px">
      <h1 class="display-1 mt-2 mb-2">Trends</h1>
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap >
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/santa-letter-780x641.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">Making your list and checking</h4>
              </div>
            </v-card-title>
              <v-list two-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                      <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/Franklin.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">A dog’s tale</h4>
              </div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                  <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/trim-1-1140x641.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">Trimming services: save money and time</h4>
              </div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                  <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/santa-letter-780x641.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">Making your list and checking</h4>
              </div>
            </v-card-title>
              <v-list two-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                      <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/Franklin.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">A dog’s tale</h4>
              </div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                  <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4>
          <v-card>
            <v-card-media src="https://elevatenv.com/wp-content/uploads/2017/11/trim-1-1140x641.jpg" height="100px">
            </v-card-media>
            <v-card-title class="pb-0 customCardTitle">
              <div>
                <h4 class="custom-headline headline mb-0">Trimming services: save money and time</h4>
              </div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://elevatenv.com/wp-content/uploads/2015/04/Elevate-May-Issue_Page_04_Image_0001-150x150.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Beth Schwartz</v-list-tile-title>
                  <v-list-tile-sub-title>With an open mind</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  })
}
</script>

<style>

</style>
