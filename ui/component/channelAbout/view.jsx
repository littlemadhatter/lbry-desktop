// @flow
import React, { Fragment } from 'react';
import MarkdownPreview from 'component/common/markdown-preview';
import ClaimTags from 'component/claimTags';
import CreditAmount from 'component/common/credit-amount';
import Button from 'component/button';
import * as PAGES from 'constants/pages';
import DateTime from 'component/dateTime';

type Props = {
  claim: ChannelClaim,
  uri: string,
  description: ?string,
  email: ?string,
  website: ?string,
};

const formatEmail = (email: string) => {
  if (email) {
    const protocolRegex = new RegExp('^mailto:', 'i');
    const protocol = protocolRegex.exec(email);
    return protocol ? email : `mailto:${email}`;
  }
  return null;
};

function ChannelAbout(props: Props) {
  const { claim, uri, description, email, website } = props;

  return (
    <div className="card">
      <section className="section card--section">
        <Fragment>
          {description && (
            <div className="media__info-text media__info-text--constrained">
              <MarkdownPreview content={description} />
            </div>
          )}
          {email && (
            <Fragment>
              <label>{__('Contact')}</label>
              <div className="media__info-text">
                <MarkdownPreview content={formatEmail(email)} />
              </div>
            </Fragment>
          )}
          {website && (
            <Fragment>
              <label>{__('Site')}</label>
              <div className="media__info-text">
                <MarkdownPreview content={website} />
              </div>
            </Fragment>
          )}

          <label>{__('Tags')}</label>
          <div className="media__info-text">
            <ClaimTags uri={uri} type="large" />
          </div>

          <label>{__('Total Publishes')}</label>
          <div className="media__info-text">{claim.meta.claims_in_channel}</div>

          <label>{__('Last Updated')}</label>
          <div className="media__info-text">
            <DateTime timeAgo uri={uri} />
          </div>

          <label>{__('Claim ID')}</label>
          <div className="media__info-text">
            <div className="media__info-text media__info-text--constrained">{claim.claim_id}</div>
          </div>

          <label>{__('Staked LBC')}</label>
          <div className="media__info-text">
            <CreditAmount
              badge={false}
              amount={parseFloat(claim.amount) + parseFloat(claim.meta.support_amount)}
              precision={8}
            />{' '}
            (
            <Button
              button="link"
              label={__('view other claims at lbry://%name%', {
                name: claim.name,
              })}
              navigate={`/$/${PAGES.TOP}?name=${claim.name}`}
            />
            )
          </div>
          
          {channelIsMine && (
          <label>Delete Channel</label>
          <div class="media__info-text">
            <button title="Abandon Claim" aria-label="Abandon Claim" class="button button--secondary" type="button">
              <span class="button__content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon--Trash">
                  <g><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                    </path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        )}
          
        </Fragment>
      </section>
    </div>
  );
}

export default ChannelAbout;
