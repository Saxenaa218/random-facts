import { useState } from "react";
import debounce from 'lodash/debounce';
import { Select } from "antd";
import { Line } from 'react-chartjs-2';
import { ChartOptions } from "chart.js";


interface ListType {
    schemeCode: number;
    schemeName: string;
}

const Funds = () => {

    const [list, setList] = useState<ListType[]>([]);
    const [selected, setSelected] = useState<ListType>({
        schemeCode: 0,
        schemeName: ''
    })
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    const handleDebounceFn = (search: string) => {
        console.log(search)
        fetch(`https://api.mfapi.in/mf/search?q=${search}`)
          .then(response => response.json())
          .then(data => setList(data))
          .finally(() => setLoading(false))
    }

    const debounceFn = debounce(handleDebounceFn, 1000);

    const handleChange = (str: string) => {
        setLoading(true)
        debounceFn(str);
    };

    const handleSelected = (value: string, option: any) => {
        setSelected({
            schemeCode: option.key,
            schemeName: value
        })
        fetch(`https://api.mfapi.in/mf/${option.key}`)
            .then(response => response.json())
            .then(data => setData(data))
            .finally(() => setLoading(false))
    }

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 7],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            lineTension: 0.1
          }
        ]
      };
      

    const chartOptions: any = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    };     

    return (
        <div>
            <section className="flex justify-center items-center">
                {/* <input type="text" list="data" onChange={handleChange} />
                <datalist id="data">
                    {list.map((item: ListType) =>
                        <option key={item.schemeCode} value={item.schemeName} onClick={() => setSelected(item)} />
                    )}
                </datalist> */}
                <Select
                    showSearch
                    style={{ width: '50%' }}
                    placeholder="Search and select..."
                    // options={list}
                    // onChange={handleChange}
                    onSearch={handleChange}
                    loading={loading}
                    notFoundContent={<></>}
                    dropdownMatchSelectWidth={false}
                    onSelect={handleSelected}
                >
                    {list.map((itm: ListType) => 
                        <Select.Option 
                            key={itm.schemeCode} 
                            value={itm.schemeName}
                            // onClick={() => handleSelected(itm)}
                        >
                            {itm.schemeName}
                        </Select.Option>
                    )}
                </Select>
            </section>
            <section>
                <>{JSON.stringify(data)}</>
                {/* {selected.schemeCode !== 0 && <Line data={chartData} options={chartOptions} />} */}
            </section>
        </div>
    )
}

export default Funds;