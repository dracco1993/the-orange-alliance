import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from "../../../../providers/ftc-database";
import { MatchParser, MatchSorter } from "../../../../util/match-utils";

@Component({
  providers: [FTCDatabase],
  selector: 'event-matches',
  templateUrl: './event-matches.component.html'
})
export class EventMatchesComponent implements OnInit {

  @Input() matches: any;

  match_sorter: MatchSorter;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {
    this.match_sorter = new MatchSorter();
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = this.match_sorter.sort(this.matches, 0, this.matches.length - 1);
    }
  }

  getMatchString(match_data): string {
    return new MatchParser(match_data).toString();
  }

  getStation(match_data, station: number): string {
    return match_data.teams.toString().split(",")[station];
  }

}
