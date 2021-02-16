import React, { useContext, useEffect, useState } from 'react';
import { sp } from "sp-pnp-js";

import { GlobalContext } from '../../context/GlobalState';
import { ListItem } from './ListItem';

const Content = () => {
  const {
    listItems,
    isFetching,
    fetchListStarted,
    fetchListSuccess,
    fetchListFailure
  } = useContext(GlobalContext);

  useEffect(async () => {
    fetchListStarted();
    try {
      const userLists = await sp.web.lists.getById('8C271450-D3F9-489C-B4FC-9C7470594466').items.get();
      const promises = userLists.map(async (list) => {
        if (list.Person_x0020_ResponsibleId) {
          const username = await getUserById(list.Person_x0020_ResponsibleId);
          list.Person_Responsible = username;
        } else {
          list.Person_Responsible = '-';
        }
        return list;
      });
      await Promise.all(promises);
      fetchListSuccess(userLists);
    } catch (error) {
      fetchListFailure(error)
    }
  }, [])
  
  const getUserById = async (userId) => {
    return sp.web.siteUsers.getById(userId).get().then(result => result.Title);
  }
  
  // useEffect(() => {
  //   console.log('2. listItems ->', listItems.reverse());
  // }, [listItems]);

  return (
    <div className="card-content">
      <table className="card-content__table">
        <thead>
          <tr>
            <th rowSpan="2">Project Name</th>
            <th rowSpan="2">Person Responsible</th>
            <th rowSpan="2">Status</th>
            <th rowSpan="2" className="width-300">Status Notes</th>
            <th colSpan="3" className="white-bottom-border">Review Status</th>
            <th rowSpan="2">&nbsp;</th>
          </tr>
          <tr>
            <th>Team</th>
            <th className="white-side-border">Lead</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {isFetching && 
          <tr>
            <td colSpan="9">Loading please wait ...</td>
          </tr>
          }
          {!isFetching && listItems.length &&
            <>
            { listItems.map((list, i) => (
              <ListItem key={i} list={list}></ListItem>
            ))}
            </>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Content;