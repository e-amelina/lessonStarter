import {isWeekend} from "../utils";

const rowsForHeaderSection = 1;
export const createTableBody = (root, teemsData, countDays, month, year) => {
  for (let i = 0; i < teemsData.teams.length; i++) {
    for (let j = 0; j < teemsData.teams[i].members.length + rowsForHeaderSection; j++) {
      const row = root.insertRow();
      row.classList.add(`${(teemsData.teams[i].name).split(' ').join('-')}`);
      if (j === 0) {
        row.classList.add("department");
      }
      if (j === teemsData.teams[i].members.length + rowsForHeaderSection - 1) {
        row.classList.add("last-row");
      }
      for (let k = 0; k <= countDays + 1; k++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        if (k === 0) {
          cell.classList.add("teem");
          if (j === 0) {
            const wrap = document.createElement("div");
            wrap.classList.add("teem__info");
            const teemName = document.createElement("span");
            teemName.classList.add("teem__name");
            teemName.innerText = teemsData.teams[i].name;
            wrap.append(teemName);

            const countMembersTeem = document.createElement("span");
            countMembersTeem.classList.add("teem__count-members");
            countMembersTeem.innerText = `${teemsData.teams[i].members.length}`;
            wrap.append(countMembersTeem);

            const percentageOfAbsent = document.createElement("span");
            percentageOfAbsent.classList.add("teem__percentage-absent");
            percentageOfAbsent.innerText = ` ${teemsData.teams[i].percentageOfAbsent[month]}%`;
            wrap.append(percentageOfAbsent);

            const hideMembers = document.createElement("span");
            hideMembers.classList.add("teem__btn--hide");
            hideMembers.addEventListener("click", (e) => {
              const hideMember = hideMembers.parentNode.parentElement.parentElement.classList;
              if (hideMember.contains('close')) {

                for (let t = 0; t < teemsData.teams.length; t++) {
                  if (hideMember.contains(`${(teemsData.teams[t].name).split(' ').join('-')}`)) {
                    const hiddenElem = document.querySelectorAll(`.${(teemsData.teams[t].name).split(' ').join('-')}`);

                    hiddenElem.forEach(elem => {
                      if (!elem.classList.contains('close')) {
                        elem.classList.remove('hidden');
                      }
                    });
                  }
                }
                hideMember.remove('close');
              } else {
                hideMember.add('close');
                for (let t = 0; t < teemsData.teams.length; t++) {
                  if (hideMember.contains(`${(teemsData.teams[t].name).split(' ').join('-')}`)) {
                    const hiddenElem = document.querySelectorAll(`.${(teemsData.teams[t].name).split(' ').join('-')}`);
                    hiddenElem.forEach(elem => {
                      !elem.classList.contains('close') ? elem.classList.add('hidden') : false;
                    });
                  }
                }
              }
            });
            wrap.append(hideMembers);
            cell.append(wrap);
          } else {
            cell.innerText = teemsData.teams[i].members[j - 1].name;
          }
        } else if (k === countDays + 1) {
          cell.classList.add("cell-sum");

        } else {
          const date = new Date(year, month, k);

          if (isWeekend(date)) {
            cell.classList.add("weekend");
          }
        }
        row.append(cell);
      }
    }
  }

  return root;
}
