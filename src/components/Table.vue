<template>
    <div>
        <div class="jf-search">
            Título: <input v-model="input" type="text" @keyup="search">
        </div>
        <table class="jf-table">
            <tr class="jf-table--row">
                <th class="jf-table--header"
                    v-for="attr in attributes"
                    :key="attr.key"
                    :class="{
                        'is-asc' : sortBy === attr.key,
                        'is-desc' : sortDir === 'desc'
                    }"
                    @click="sort(attr.key)"
                >
                    {{ attr.value }}
                </th>
            </tr>
            <tr class="jf-table--row" v-for="(movie, i) in moviePage.items" :key="i">
                <td class="jf-table--data" v-for="attr in attributes" :key="attr.key">
                    {{ movie[attr.key] }}
                </td>
            </tr>
        </table>
        <div class="pagination">
            <span>Página {{ currentPage }} de {{ moviePage.pages }}</span>
            <button v-if="moviePage.prev" @click="goTo(moviePage.prev)">
                Anterior
            </button>
            <button v-if="moviePage.next" @click="goTo(moviePage.next)">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
    import MovieService from '@/services/movieService';
    import PaginationService from '@/services/paginationService';
    import SortService from '@/services/sortService';

    const PAGE_SIZE = 12
    const movieService = new MovieService()
    const sortService = new SortService()
    export default {
        name: 'TableMovies',
        props: {
            attributes: {
                type: Array,
                default: () => [{key: 'title', value: 'Título'}, {key: 'genre', value: 'Género'}]
            },
            page: {
                type: Number,
                default: 1,
            },
            pages: {
                type: Number,
                default: 10,
            },
        },
        data () {
            return {
                pagination: null,
                moviePage: {},
                sortDir: 'asc',
                sortBy: 'title',
                currentPage: this.page,
                input: '',
            }
        },
        async created () {
            this.fullMovies = await movieService.getMovies()
            this.pagination = new PaginationService(this.fullMovies, PAGE_SIZE)
            this.sort(this.sortBy)
            this.renderPage()
        },
        methods: {
            getSortDirection(key) {
                if (key === this.sortBy) {
                    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
                }
                return this.sortDir === 'desc' ? 1 : -1;
            },
            sort (key) {
                const dir = this.getSortDirection(key)
                this.sortBy = key;
                this.fullMovies = sortService.sortByKey(this.fullMovies, this.sortBy, dir)
                this.filterMovies();
            },
            renderPage (page, items) {
                this.moviePage = this.pagination.getCurrentPage(page, items);
            },
            goTo (page) {
                this.currentPage = page;
                this.renderPage(page);
            },
            filterMovies() {
                console.log(this.input.toLowerCase())
                const filteredMovies = this.fullMovies
                    .filter(item => item.title.toLowerCase().includes(this.input.toLowerCase()))
                this.pagination.setItems(filteredMovies)
                this.moviePage = this.pagination.getCurrentPage()
            },
            search () {
                this.filterMovies()
            },
        },
    }
</script>

<style lang="scss">
  .jf-search {
      display: grid;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 10px;
  }
  .jf-table {
    width: 100%;
    display: block;
    font-size: 12px;
    &--row {
        &:nth-child(even) {
            background-color: rgb(162, 210, 255);
        }
    }
    &--data, &--header {
        padding: 10px;
        text-align-last: left;
    }
    &--header {
        &.is-asc {
            &::after {
                content: "*";
            }

            &.is-desc {
                &::after {
                content: "-";
                }
            }
        }
    }
  }
  .pagination {
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    grid-gap: 10px;
    margin: 20px 0;
  }
</style>
