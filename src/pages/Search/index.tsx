/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Content, Heading3 } from "mf-core-library-v2";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Api from "../../API";
import BonusApplication from "../../API/BonusApplication";
import NewTransaction from "../../components/NewTransaction";
import UsersList from "../../components/UsersList";
import { ListItemSkeleton } from "../../components/UsersList/skeleton/ListItem";
import { useErrorStore } from "../../stores/useErrorStore";
// import useSearch from "../../hooks/useSearch";
import { useSearchStore } from "../../stores/useSearchStore";

// import UserListSkeleton from "./UserListSkeleton";

const Search: React.FC = () => {
  const { searchType, query, name, setSearchResults } = useSearchStore();

  const [searchLocalData, setSearchLocalData] =
    useState<searchResultResponse>();

  const { transactiontype } = useParams();
  const { updateErrorResults } = useErrorStore();

  console.log(decodeURI(transactiontype || ""));

  const searchMutateFunction = (
    data: searchPayload
  ): Promise<AxiosResponse> => {
    const request = BonusApplication.search(data);

    return Api.performRequestMutate(request);
  };

  const searchMutateHandler = useMutation({
    mutationFn: searchMutateFunction,
    onMutate: (variables) => {
      console.log(variables);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(error, variables, context);
    },
    onSuccess: (data) => {
      setSearchResults(data.data);
      setSearchLocalData(data.data);

      if (
        data.data.errors.length > 0 ||
        (data.data.errors.length === 0 &&
          Object.keys(data.data.data).length === 0)
      ) {
        updateErrorResults(data.data.errors);
      }
    },
    onSettled: () => {
      // navigate
    },
  });

  useEffect(() => {
    searchMutateHandler.mutate({
      workorderSearchAttribute: {
        jobDivaStartId: searchType === "Start ID" ? query : null,
        jobDivaJobNumber: searchType === "Job ID" ? query : null, // job ID (UI need to change to job no),
        vmsId: searchType === "VMS ID" ? query : null, // VMD id,
        provider: {
          id: null,
          jobDivaCandidateId: null,
          zenDeskContactId: null,
          s4BusinessPartnerID: null,
          companyName: null,
          firstName: name ? name.fname : null, // fname,
          lastName: name ? name.lname : null, // fname,
          emailAddress: null,
          phoneNumber: null,
        },
        buyer: {
          name: searchType === "Client Name" ? query : null, // client name,
        },
      },
      limit: 100,
    });
  }, []);

  const displayUserList = (): JSX.Element | JSX.Element[] | undefined => {
    if (searchMutateHandler.isLoading) return <ListItemSkeleton />;
    else if (searchMutateHandler.isError) return <p>Server error</p>;
    else if (
      searchLocalData?.data?.results?.length === 0 &&
      searchMutateHandler.isSuccess
    )
      return <p>No data...</p>;
    else if (searchLocalData?.errors && searchLocalData?.errors.length > 0)
      return <p>Some error occured</p>;
    else if (searchLocalData?.data?.results) {
      return searchLocalData?.data?.results.map(
        (item: ResultsEntity, index: number) => (
          <UsersList.Item
            key={index}
            name={`${item.provider?.firstName},${item.provider.lastName}`}
            jobTitle={item.name}
            billRate={item.currentBillRate}
            payRate={item.currentPayRate}
            clientName={item.buyer}
            jobDivaId={item.id}
            record={item}
            transactionType={decodeURI(transactiontype || "")}
            candidateId={item.provider.externalIds?.filter(
              (d) => d.type === "CandidateId"
            )}
          />
        )
      );
    } else return <p>Page refresh happened</p>;
  };

  return (
    <>
      {/* <ErrorContainer isLoaded={true}> */}
      <Content app="admin">
        <NewTransaction text={"Start a new transaction"} />
        <div className="admin-dashboard__container">
          <Heading3 color={"primary"}>
            Select the candidate's assignment
          </Heading3>
          {/* {displayTitle()} */}
          <UsersList>{displayUserList()}</UsersList>
        </div>
      </Content>
      {/* </ErrorContainer> */}
    </>
  );
};

export default Search;
