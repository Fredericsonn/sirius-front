import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { spring } from "../util/index";

const RADIAN = Math.PI / 180;
const impactScores = {
    "Aluminium": 3, "Verre": 2, "Cuivre": 5, "Silicium": 4,
    "Néodyme": 7, "Or": 9, "Lithium": 8, "Nickel": 6, "Encre": 5,"plastique":10,
};

const ImpactScoreCalculator = () => {
    const [globalImpactScore, setGlobalImpactScore] = useState(0);
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await spring.get("/machines");
                const resources = response.data.devices.concat(response.data.vehicles);

                let totalVolume = 0;
                let totalImpactScore = 0;
                const matterImpacts = {};

                resources.forEach(machine => {
                    machine.resources.forEach(resource => {
                        resource.matters.forEach(matter => {
                            const name = matter.value;
                            const volume = matter.volume;
                            const impact = impactScores[name] || 5;

                            if (!matterImpacts[name]) {
                                matterImpacts[name] = { totalVolume: 0, totalImpact: 0 };
                            }

                            matterImpacts[name].totalVolume += volume;
                            matterImpacts[name].totalImpact += volume * impact;

                            totalVolume += volume;
                            totalImpactScore += volume * impact;
                        });
                    });
                });

                const globalScore = totalVolume > 0 ? (totalImpactScore / totalVolume).toFixed(2) : 0;

                const formatted = Object.keys(matterImpacts).map(name => ({
                    name,
                    volume: matterImpacts[name].totalVolume,
                    impactScore: (matterImpacts[name].totalImpact / matterImpacts[name].totalVolume).toFixed(2)
                }));

                setFormattedData(formatted);
                setGlobalImpactScore(Number(globalScore));
            } catch (error) {
                console.error("Erreur de chargement des données :", error);
            }
        };

        fetchData();
    }, []);

    const gaugeData = [
        { name: 'Poor', value: 4.9, color: '#FF4D4D' },    // Red (0-4.9)
        { name: 'Medium', value: 2.5, color: '#FFA500' },  // Orange (5-7.49)
        { name: 'Good', value: 2.6, color: '#4CAF50' }     // Green (7.5-10)
    ];

    const cx = 200;
    const cy = 200;
    const iR = 60;
    const oR = 100;

    const needle = (value, data, cx, cy, iR, oR, color) => {
        let total = 0;
        data.forEach((v) => {
            total += v.value;
        });
        const ang = 180.0 * (1 - value / 10); // Dividing by 10 since our score is out of 10
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path
                key="path"
                d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
                stroke="none"
                fill={color}
            />,
        ];
    };

    // Function to determine needle color and performance label based on score
    const getScoreInfo = (score) => {
        if (score >= 7.5) return { color: '#4CAF50', label: 'Good' };
        if (score >= 5) return { color: '#FFA500', label: 'Medium' };
        return { color: '#FF4D4D', label: 'Poor' };
    };

    const scoreInfo = getScoreInfo(globalImpactScore);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                Score d'Impact Environnemental
            </h2>
            <div className="relative">
                <PieChart width={400} height={300}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={gaugeData}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        stroke="none"
                    >
                        {gaugeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    {needle(globalImpactScore, gaugeData, cx, cy, iR, oR, scoreInfo.color)}
                </PieChart>
            </div>
            
            <div className="text-center mt-4 flex items-center gap-2">
                <p className="text-3xl font-bold" style={{ color: scoreInfo.color }}>
                    {globalImpactScore}
                    <span className="text-xl text-gray-500 font-normal">/10</span>
                </p>
                <span className="text-lg font-medium ml-2" style={{ color: scoreInfo.color }}>
                    ({scoreInfo.label})
                </span>
            </div>
        </div>
    );
};

export default ImpactScoreCalculator; 