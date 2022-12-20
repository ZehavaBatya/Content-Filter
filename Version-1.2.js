import wixData from 'wix-data';

const databaseName = 'Courses';
const databaseField = 'arraystring';

$w.onReady(function () {

    $w('#checkboxGroup1').onChange((event) => {
        const selectedBox = $w('#checkboxGroup1').value;
        addItemstoRepeater(selectedBox);
    })
	 $w('#checkboxGroup2').onChange((event) => {
        const selectedBox = $w('#checkboxGroup2').value;
        addItemstoRepeater(selectedBox);
    })
       //SEARCH BUTTON TRIGGER
    $w("#button").onClick(function () {
        search();
    });

    //ENTER KEY TRIGGER
    $w("#input1").onKeyPress(function (event) {
        if (event.key === "Enter") {
            search();
        }
    });
});

function addItemstoRepeater(selectedOption = []) {

    let dataQuery = wixData.query(databaseName);

    if (selectedOption.length > 0) {
        dataQuery = dataQuery.hasSome(databaseField, selectedOption);
    }

    dataQuery
        .find()
        .then(results => {
            const filtereditemsReady = results.items;
            $w('#listRepeater').data = filtereditemsReady;

        })
}

    $w("#slider").onChange(() => {

        let price = $w("#slider").value
        
        $w("#dynamicDataset").setFilter(wixData.filter()
            .eq('coursePrice', price) //Change .eq to .le to filter less than and equal to price

        )
    })
