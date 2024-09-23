import "./App.scss";
import { version } from "../package.json";
import {
	Content,
	ContentSwitcher,
	DataTable,
	Header,
	HeaderContainer,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderName,
	HeaderPanel,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableToolbar,
	TableToolbarAction,
	TableToolbarContent,
	TableToolbarMenu,
	TableToolbarSearch,
} from "@carbon/react";
import LogoURL from "./images/logo.png";
import { PlayerData } from "./data/playerData";

import { PlayerDataHeaders } from "./data/playerDataHeaders";
import {
	Email,
	CalendarHeatMap as MenuIcon,
	Settings,
} from "@carbon/react/icons";
import { DatesData } from "./data/datesData";
import { DatesDataB } from "./data/datesDataB";
import { useState } from "react";
function App() {
	const [currentDates, setCurrentDates] = useState(DatesData);
	const [selectedTeamCalendar, setSelectedTeamCalendar] = useState(0);

	const ContentStyle = {
		height: "100%",
		padding: "0",
		marginBottom: "0px",
		width: "100%",
	};

	const EventState = {
		PAST: "past",
		PRESENT: "present",
		FUTURE: "future",
	};

	const evalEventDate = (eventDate, currentDate) => {
		const EvDate = eventDate.setHours(0, 0, 0, 0);
		const CurDate = currentDate.setHours(0, 0, 0, 0);
		const EvTime = EvDate;
		const CurTime = CurDate;

		if (EvTime < CurTime) {
			return EventState.PAST;
		} else if (EvTime === CurTime) {
			return EventState.PRESENT;
		} else {
			return EventState.FUTURE;
		}
	};

	const handleCalChange = (e) => {
		if (e.name === "A") {
			setCurrentDates(DatesData);
		} else {
			setCurrentDates(DatesDataB);
		}
		setSelectedTeamCalendar(e.index);
	};

	return (
		<div className="appContainer">
			<HeaderContainer
				render={({ isSideNavExpanded, onClickSideNavExpand }) => (
					<>
						<Header aria-label="IBM Platform Name">
							<img className="headerLogo" src={LogoURL} />
							<HeaderName href="#" prefix="Wolverine">
								Football
							</HeaderName>

							<HeaderGlobalBar>
								<HeaderGlobalAction
									aria-label="Contact Developer"
									href="mailto:madkidflash@gmail.com?subject=Help with ABMS football app"
								>
									<Email size={20} />
								</HeaderGlobalAction>
								<HeaderGlobalAction
									aria-label={
										isSideNavExpanded
											? "Close events"
											: "Open events"
									}
									aria-expanded={isSideNavExpanded}
									isActive={isSideNavExpanded}
									onClick={onClickSideNavExpand}
									tooltipAlignment="end"
									id="switcher-button"
								>
									<MenuIcon size={20} />
								</HeaderGlobalAction>
							</HeaderGlobalBar>
							<HeaderPanel
								expanded={isSideNavExpanded}
								onHeaderPanelFocus={onClickSideNavExpand}
								href="#switcher-button"
								className={
									isSideNavExpanded
										? "eventsPanelOpen"
										: "eventsPanelClosed"
								}
							>
								<section>
									<ContentSwitcher
										onChange={handleCalChange}
										selectedIndex={selectedTeamCalendar}
									>
										<Switch name="A" text="A Schedule" />
										<Switch name="B" text="B Schedule" />
									</ContentSwitcher>
								</section>
								<section className="appDates">
									{currentDates.map((monthEl, mIdx) => {
										const currentDate = new Date();
										return (
											<section key={mIdx}>
												<h4 className="monthSectionTitle">
													{monthEl.month}
												</h4>
												{monthEl.events.map(
													(elEvent, elIdx) => {
														const eventDate =
															new Date(
																Date.parse(
																	`${monthEl.month} ${elEvent.day}, 2024`
																)
															);
														const eventDateState =
															evalEventDate(
																eventDate,
																currentDate
															);
														console.log(
															`eventDate (${eventDate}) state is: ${eventDateState}`
														);
														return (
															<div
																className={`fbEvent ${eventDateState}`}
																key={elIdx}
															>
																<span className="day">
																	{
																		elEvent.day
																	}
																</span>{" "}
																-{" "}
																<span>
																	{
																		elEvent.time
																	}
																</span>
																<div className="info">
																	<strong>
																		{
																			elEvent.info
																		}
																	</strong>
																</div>
																<div className="location">
																	{
																		elEvent.location
																	}
																</div>
															</div>
														);
													}
												)}
											</section>
										);
									})}
								</section>

								<div className="appPanelFooter">
									Version {version}
								</div>
							</HeaderPanel>
						</Header>
						<Content id="main-content" style={ContentStyle}>
							<section className="appDataTable">
								<DataTable
									isSortable
									headers={PlayerDataHeaders}
									rows={PlayerData}
								>
									{({
										rows,
										headers,
										getTableProps,
										getHeaderProps,
										getRowProps,
										onInputChange,
									}) => (
										<TableContainer>
											<TableToolbar>
												<TableToolbarContent className="TableTBContent">
													<TableToolbarSearch
														expanded
														onChange={onInputChange}
														placeholder="Filter players"
													/>
													{/* <TableToolbarMenu
														className="Tacos"
														renderIcon={Settings}
													>
														<TableToolbarAction
															onClick={() =>
																console.log(
																	"Alert 1"
																)
															}
														>
															Action 1
														</TableToolbarAction>
													</TableToolbarMenu> */}
												</TableToolbarContent>
											</TableToolbar>
											<Table
												{...getTableProps()}
												stickyHeader
											>
												<TableHead>
													<TableRow>
														{headers.map(
															(header, hIdx) => (
																<TableHeader
																	{...getHeaderProps(
																		{
																			header,
																		}
																	)}
																	key={hIdx}
																>
																	{
																		header.header
																	}
																</TableHeader>
															)
														)}
													</TableRow>
												</TableHead>
												<TableBody>
													{rows.map((row, rIdx) => (
														<TableRow
															{...getRowProps({
																row,
															})}
															key={rIdx}
														>
															{row.cells.map(
																(cell) => (
																	<TableCell
																		key={
																			cell.id
																		}
																	>
																		{
																			cell.value
																		}
																	</TableCell>
																)
															)}
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									)}
								</DataTable>
							</section>
						</Content>
					</>
				)}
			/>
		</div>
	);
}

export default App;
