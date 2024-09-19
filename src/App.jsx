import "./App.scss";
import {
	DataTable,
	Header,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableToolbar,
	TableToolbarContent,
	TableToolbarSearch,
} from "@carbon/react";
import LogoURL from "./images/logo.png";
import { PlayerData } from "./data/playerData";
import { useState } from "react";
import { PlayerDataHeaders } from "./data/playerDataHeaders";

function App() {
	const [filteredPlayerData, setFilteredPlayerData] = useState(PlayerData);

	const filterData = (textInputValue) => {
		if (textInputValue === "") {
			setFilteredPlayerData(PlayerData);
		}
		const lowerCaseTextEntry = textInputValue.toLowerCase();
		const tmpFilteredData = PlayerData.filter(
			(pData) =>
				pData.first_name.toLowerCase().includes(lowerCaseTextEntry) ||
				pData.last_name.toLowerCase().includes(lowerCaseTextEntry) ||
				pData.number.includes(lowerCaseTextEntry)
		);
		setFilteredPlayerData(tmpFilteredData);
	};

	return (
		<div className="appContainer">
			<header className="appHeader">
				<img src={LogoURL} />
				<h1 className="appTitle">Football Roster</h1>
			</header>
			<section className="appDataTable">
				<DataTable
					isSortable
					headers={PlayerDataHeaders}
					rows={filteredPlayerData}
				>
					{({
						rows,
						headers,
						getTableProps,
						getHeaderProps,
						getRowProps,
					}) => (
						<TableContainer>
							<TableToolbar>
								<TableToolbarContent>
									{/* pass in `onInputChange` change here to make filtering work */}
									<TableToolbarSearch
										expanded="true"
										onChange={(e) =>
											filterData(e.target.value)
										}
									/>
								</TableToolbarContent>
							</TableToolbar>
							<Table {...getTableProps()} stickyHeader>
								<TableHead>
									<TableRow>
										{headers.map((header, hIdx) => (
											<TableHeader
												{...getHeaderProps({ header })}
												key={hIdx}
											>
												{header.header}
											</TableHeader>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row, rIdx) => (
										<TableRow
											{...getRowProps({ row })}
											key={rIdx}
										>
											{row.cells.map((cell) => (
												<TableCell key={cell.id}>
													{cell.value}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</DataTable>
			</section>
		</div>
	);
}

export default App;
