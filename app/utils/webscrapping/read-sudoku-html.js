const values = []
$($(".su-preview")[0]).children().children().each(function () {
    const row = []
    $(this).children().each(function () {
        const rawValue = $(this).text()
        const value = (rawValue.length && !isNaN(Number(rawValue))) ? Number(rawValue) : null
        row.push({ value, notes: [] })
    })

    values.push(row)
})

console.log(JSON.stringify(values))