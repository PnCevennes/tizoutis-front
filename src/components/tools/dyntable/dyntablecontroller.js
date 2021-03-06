const defaultFilter = (value, filterValue) => value && (value.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)

const defaultSortFunc = (data, fieldName, sortingOrder) => data.sort((a, b) => (a[fieldName] > b[fieldName] ? 1 : -1) * sortingOrder)

class TableController {
    page = 0
    pages = 0
    selected = {}
    // eslint-disable-next-line
    selected_id = ''
    sortfuncs = {}
    sorting = {}
    filters = {}
    filterData = {}
    filteredData = {}
    directive = {}
    data = []
    _data = []
    fields = []
    limit = 0
    lineStyle = x => ''

    constructor (config, data) {
        this.config = config
        this.fields = config.fields
        this._data = data !== undefined ? data : []
        this.limit = config.limit !== undefined ? config.limit : 25
        this.page = config.page !== undefined ? config.page : 0
        for (var _field in config.fields) {
            this.sortfuncs[config.fields[_field].name] = config.fields[_field].sortfunc ? config.fields[_field].sortfunc : defaultSortFunc
            this.filters[config.fields[_field].name] = config.fields[_field].filter ? config.fields[_field].filter : defaultFilter
            this.filterData[config.fields[_field].name] = ''
            if (config.fields[_field].transform === undefined) {
                config.fields[_field].transform = x => x
            }
        }
        if (config.lineStyle) {
            this.lineStyle = config.lineStyle
        }
        this.update()
    }

    setData (data) {
        this._data = data
        this.update()
    }

    pageUp () {
        this.page = this.page < this.pages ? this.page + 1 : this.page
        this.update()
    }

    pageDown () {
        this.page = this.page > 0 ? this.page - 1 : 0
        this.update()
    }

    setPage (numPage) {
        this.page = numPage >= 0 && numPage <= this.pages ? numPage : this.page
        this.update()
    }

    setLimit (limit) {
        this.limit = limit
        this.setPage(0)
    }

    setSorting (field) {
        var currentSortOrder = this.sorting[field]
        for (var _field in this.sorting) {
            this.sorting[_field] = 0
        }
        this.sorting[field] = currentSortOrder === 1 ? -1 : 1
        this.update()
    }

    getSortedData (data) {
        for (var _field in this.sorting) {
            if (this.sorting[_field] !== 0) {
                return this.sortfuncs[_field](data, _field, this.sorting[_field])
            }
        }
        return data
    }

    getFilteredData (data) {
        var _data = [...data]
        for (var _filter in this.filters) {
            if (this.filterData[_filter]) {
                _data = _data.filter(
                    x => this.filters[_filter](
                        x[_filter],
                        this.filterData[_filter]
                    )
                )
            }
        }
        return _data
    }

    getPaginatedData (data) {
        if (this.limit) {
            return data.slice(
                this.limit * this.page,
                this.limit * (this.page + 1)
            )
        }
        return data
    }

    update () {
        var _data = this.getSortedData(
            this.getFilteredData(
                this._data
            )
        )
        this.filteredData = _data
        this.data = this.getPaginatedData(_data)
        this.pages = Math.ceil(_data.length / this.limit)
    }

    select (item, muted) {
        this.selected = item
        this.setPage(Math.floor(this.filteredData.indexOf(item) / this.limit))
        if (muted === undefined || !muted) {
            this.directive.$emit('select', this.selected)
        }
    }

    selectSingle (item, muted) {
        if (!this.config.disallowSingleSelect) {
            this.select(item, muted)
        }
    }

    selectDouble (item, muted) {
        if (this.config.disallowSingleSelect) {
            this.select(item, muted)
        }
    }

    selectByIndex (idx, muted) {
        this.select(this.filteredData[idx], muted)
    }

    search (field, value) {
        var results = this.filteredData.filter(x => x[field] === value)
        if (results.length) {
            return results[0]
        }
        return undefined
    }
}

export {TableController}
