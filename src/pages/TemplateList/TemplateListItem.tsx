import React, { FC, MouseEventHandler } from 'react';

const TemplateListItem: FC<{onClick: MouseEventHandler<HTMLDivElement>}> = ({onClick}) => 
    {
        return (
        <div className='template-list-item' onClick={onClick} >
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur rem voluptatibus optio repudiandae. Qui, iusto, quis dolore ab asperiores harum placeat reprehenderit sapiente accusamus ducimus veniam corporis facilis perspiciatis accusantium.</p>
        </div>
        );
    }

export default TemplateListItem;